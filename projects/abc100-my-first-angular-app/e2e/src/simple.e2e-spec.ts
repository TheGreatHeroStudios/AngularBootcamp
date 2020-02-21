import { $, browser } from 'protractor';

import { checkConsole, indexPath } from '../../../../e2e-kit';

// const appPath = '100-my-first-angular-app'
const appPath = indexPath(__dirname);

describe(appPath, async () => {
  it('should load without error', async () => {
    // This is an Angular application, so enable automatic waiting:
    await browser.waitForAngularEnabled(true);
    await browser.get(appPath);
    expect(await checkConsole()).toEqual('');
  });

  it('should display a proper heading', async () => {
    expect(await $('h1').getText()).toBe('My First Angular App');
  });
});
