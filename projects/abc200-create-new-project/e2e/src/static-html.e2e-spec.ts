import { browser } from 'protractor';

import { checkConsole, indexPath } from '../../../../e2e-kit';

const appPath = indexPath(__dirname);

describe(appPath, async () => {
  it('should load without error', async () => {
    // This example isn't even an angular application, just a static
    // page. Configure Protractor not to work in Angular mode.
    await browser.waitForAngularEnabled(false);
    await browser.get(appPath);
    expect(await checkConsole()).toEqual('');
  });
});
