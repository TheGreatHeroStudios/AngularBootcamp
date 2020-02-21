import { $$, ElementFinder, browser, by, element } from 'protractor';

import { checkConsole, indexPath } from '../../../../e2e-kit';

const appPath = indexPath(__dirname);

const reportDate = element(
  by.cssContainingText('.card-title', 'Sales Report: Dec 25, 2058')
);
const units = $$('td:nth-child(2)');

describe(appPath, () => {
  beforeAll(async () => {
    await browser.waitForAngularEnabled(true);
    await browser.get(appPath);
  });

  it('should load without error', async () => {
    expect(await checkConsole()).toEqual('');
  });

  describe('sales report', () => {
    // Caution: these tests boarder on testing Angular functionality
    // instead of application features

    it('should display report date in acceptable format', async () => {
      expect(await reportDate.isPresent()).toBeTruthy();
    });

    it('should present sales numbers in appropriate format', async () => {
      expect(await units.count()).toBe(8);
      await units.each(async unit => {
        expect(unit).toBeDefined();
        const u: ElementFinder = unit as ElementFinder;
        // RegExp testing 1.1111 format
        expect(await u.getText()).toMatch(/\d\.\d\d\d\d/);
      });
    });
  });
});
