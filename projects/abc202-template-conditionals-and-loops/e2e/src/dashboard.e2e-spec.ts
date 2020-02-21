import { $, $$, browser, by, element } from 'protractor';

import { checkConsole, indexPath } from '../../../../e2e-kit';

const appPath = indexPath(__dirname);

const dashboardLink = $('[href="#/dashboard"]');
const employeesLink = $('[href="#/employees"]');
const dashboardSections = $$('.card-title');
const employeeTitle = $('.card-title');
const profileToggle = $('button');
const todoItems = $('.todo').$$('.collection-item');
// Note difference in how code semantics change between the following two locators
// The first describes the DOM structure
// The second describes the visual semantics of the element in question
// Look below to see how these are used
const profileText = $('.pad-around');
// Again consider updating the HTML to use E2E attribute markers instead of
// tightly coupled css locators
const listAddButton = element(
  by.cssContainingText('.material-icons', 'add')
);
const employeeList = $$('strong');

describe(appPath, () => {
  beforeAll(async () => {
    await browser.waitForAngularEnabled(true);
    await browser.get(appPath);
  });

  it('should load without error', async () => {
    expect(await checkConsole()).toEqual('');
  });

  describe('navigation', () => {
    it('should start on dashboard screen', async () => {
      expect(await dashboardSections.getText()).toEqual([
        'Profile',
        'Todo List',
        'Upcoming Meetings',
        'Who is in meetings'
      ]);
    });

    it('can navigate to employee browser', async () => {
      await employeesLink.click();
      await browser.sleep(300); // Sometimes lazy routes take a moment
      expect(await employeeTitle.getText()).toBe('Employees');
    });
  });

  describe('dashboard', () => {
    beforeAll(async () => {
      await dashboardLink.click();
    });

    it('hides and shows the profile', async () => {
      await profileToggle.click();
      expect(await profileText.isPresent()).toBeFalsy();
      expect(await profileToggle.getText()).toBe('SHOW PROFILE');
      await profileToggle.click();
      // ...checking for isPresent is correct here because the visual semantics are not a part
      // of the locator. This checks that the text is not only present but that it is also correct.
      expect(await profileText.getText()).toContain('Phone');
      expect(await profileToggle.getText()).toBe('HIDE PROFILE');
    });

    it('adds more todo items', async () => {
      await listAddButton.click();
      expect(await todoItems.count()).toBe(4);
    });
  });

  describe('employee browser', () => {
    beforeAll(async () => {
      await employeesLink.click();
    });

    it('should display all employee roles', async () => {
      expect(await employeeList.count()).toBe(8);
      // TODO: test role counts
    });
  });
});
