const fg = require('fast-glob');

const prefix = process.argv[2];

async function go() {
  const projectNames = await fg([`abc${prefix}-*`], {
    cwd: 'projects',
    onlyDirectories: true
  });

  if (projectNames.length === 1) {
    process.argv = [
      process.argv[0],
      './node_modules/@angular/cli/bin/ng',
      'serve',
      projectNames[0]
    ];
    require('./node_modules/@angular/cli/bin/ng');
  } else {
    console.error('cannot find', prefix);
    process.exit(1);
  }
}

go();
