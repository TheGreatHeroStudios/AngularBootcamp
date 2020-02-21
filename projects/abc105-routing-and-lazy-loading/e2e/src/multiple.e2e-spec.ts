import { $, browser, by, element } from 'protractor';

import { checkConsole, indexPath } from '../../../../e2e-kit';

const appPath = indexPath(__dirname);

const heading = $('.card-title');
const payrollNav = element(by.cssContainingText('a', 'Payroll'));

describe(appPath, async () => {
  beforeAll(async () => {
    await browser.waitForAngularEnabled(true);
    await browser.get(appPath);
  });

  it('should load without error', async () => {
    expect(await checkConsole()).toEqual('');
  });

  it('should start on HR', async () => {
    expect(await heading.getText()).toBe('HR Functionality');
  });

  it('should navigate to Payroll', async () => {
    await payrollNav.click();
    expect(await heading.getText()).toBe('Payroll Functionality');
  });
});
