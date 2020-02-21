// Our special "ng serve" substitute.

const { Observable } = require('rxjs');
const {
  filter,
  mapTo,
  groupBy,
  mergeMap,
  debounceTime
} = require('rxjs/operators');

const liveServer = require('@oasisdigital/live-server');
const chokidar = require('chokidar');
const { spawn } = require('child_process');
const path = require('path');
const fg = require('fast-glob');
const BetterQueue = require('better-queue');

// Serve files

function startLiveServer() {
  liveServer.start({
    root: 'dist',
    open: false,
    noCssInject: true,
    wait: 300,
    logLevel: 0,
    mount: [
      ['/demo-data', './demo-data'],
      ['/favicon.ico', './favicon.ico']
    ],

    proxy: [['/api', 'http://localhost:8085']]
  });
}

// Auto build

const workQueue = new BetterQueue(buildProject, {
  concurrent: 1,
  filo: true,
  cancelIfRunning: true
});

workQueue.on('drain', () =>
  console.log('All builds complete, awaiting next change')
);

async function enqueueUnBuilt() {
  const projectNames = await fg(['abc*', '!*SKIP*'], {
    cwd: 'projects',
    onlyDirectories: true
  });

  const distNames = await fg(['abc*'], {
    cwd: 'dist',
    onlyDirectories: true
  });

  const unBuilt = projectNames.filter(
    name => distNames.indexOf(name) < 0
  );

  unBuilt.sort();
  unBuilt.reverse();
  console.log('Un-built projects need to be built:', unBuilt.length);

  workQueue.pause();
  unBuilt.forEach((projectName, i) =>
    workQueue.push({ id: projectName, initial: true })
  );
  workQueue.resume();
}

function rebuildOnChange() {
  const changes = Observable.create(function(observer) {
    const watcher = chokidar.watch('./projects');
    watcher.on('all', (event, filePath) =>
      observer.next({ event, filePath })
    );
    return () => watcher.unwatch();
  });

  changes
    .pipe(
      filter(({ event }) => event === 'change'),
      groupBy(({ filePath }) => filePath.split(path.sep)[1]), // Group by the project name
      mergeMap(projectChanges$ =>
        projectChanges$.pipe(
          debounceTime(1000),
          mapTo(projectChanges$.key)
        )
      )
    )
    .subscribe(projectName => {
      console.log('Change detected on project: ' + projectName);
      workQueue.cancel(projectName);
      workQueue.push({ id: projectName });
    });
}

function buildProject(task, completedCallback) {
  const projectName = task.id;
  console.log(projectName, 'Building');
  console.time(projectName);
  const builder = spawn(
    'node',
    [
      './node_modules/@angular/cli/bin/ng',
      'build',
      projectName,
      `--baseHref=/${projectName}/`,
      '--deleteOutputPath=false'
    ],
    {
      cwd: process.cwd()
    }
  );

  builder.stdout.on('data', data => {
    // console.log(data.toString());
  });

  builder.stderr.on('data', data => {
    console.error(projectName, data.toString());
  });

  builder.on('close', code => {
    if (code) {
      console.error('BUILD FAILED!', code);
    } else {
      console.timeEnd(projectName);
    }
    completedCallback();
  });

  return {
    cancel: function() {
      console.log('stopping build in progress');
      builder.kill('SIGINT'); // control C
    }
  };
}

startLiveServer();
enqueueUnBuilt();
rebuildOnChange();
