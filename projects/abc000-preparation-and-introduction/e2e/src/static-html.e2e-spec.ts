import { $, browser } from 'protractor';

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

  it('should display a proper heading', async () => {
    expect(await $('.brand-logo').getText()).toBe(
      'Preparation and Introduction'
    );
  });
});

// Run specs for just one example:
// yarn protractor --specs=100-*/**/**.e2e-spec.ts
// Or, at a Bash prompt:
// ./e2e-one.sh 000
