// Protractor test support code

import * as fs from 'fs';
import * as path from 'path';
import { browser } from 'protractor';

export async function checkConsole() {
  return browser
    .manage()
    .logs()
    .get('browser')
    .then(browserLog => {
      const errors = [];
      // This code needs to work way back in IE, not 100% clear for-of will be compiled.
      // tslint:disable-next-line:prefer-for-of
      for (let x = 0; x < browserLog.length; x++) {
        if (browserLog[x].level.name === 'SEVERE') {
          console.log('\n' + browserLog[x].level.name);
          console.log(
            '(Possibly exception) \n' + browserLog[x].message
          );
          errors.push(browserLog[x].message);
        }
      }
      return errors.join('\n');
    });
}

// This function helps each Protractor test bring up the corresponding
// running application example, without repeating the name of the
// example directory.

export function indexPath(dir: string) {
  const relativeAppPath = path
    .relative(__dirname, dir)
    .split(path.sep)[0];
  const aotIndexFile = path.join(dir, 'aot-index.html');
  if (fs.existsSync(path.join(__dirname, aotIndexFile))) {
    return aotIndexFile;
  }
  return relativeAppPath;
}
