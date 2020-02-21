import { $$, browser } from 'protractor';

import { checkConsole, indexPath } from '../../../../e2e-kit';

const appPath = indexPath(__dirname);

const featureTitles = $$('.card-title');

describe(appPath, async () => {
  beforeAll(async () => {
    await browser.waitForAngularEnabled(true);
    await browser.get(appPath);
  });

  it('should load without error', async () => {
    expect(await checkConsole()).toEqual('');
  });

  it('should have both feature headings', async () => {
    expect(await featureTitles.getText()).toEqual([
      'Payroll Functionality',
      'HR Functionality'
    ]);
  });
});
