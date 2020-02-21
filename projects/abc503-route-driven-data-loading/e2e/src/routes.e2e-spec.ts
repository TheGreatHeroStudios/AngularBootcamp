import { $, browser, by, element } from 'protractor';

import { checkConsole, indexPath } from '../../../../e2e-kit';

const thisExampleDirectory = indexPath(__dirname);

describe(thisExampleDirectory, async () => {
  it('should load without error', async () => {
    await browser.waitForAngularEnabled(true);
    await browser.get(thisExampleDirectory);
    expect(await checkConsole()).toEqual('');
  });

  it('should offer to Select an Employee', async () => {
    expect(await $('.card-title').getText()).toEqual(
      'Select Employee'
    );
  });

  it('should navigate to Jose Jacobs', async () => {
    const jose = by.cssContainingText('a', 'Jose Jacobs');
    await element(jose).click();
    expect(await $('.card-title').getText()).toEqual(
      'Name: Jose Jacobs'
    );
  });
});

// Run specs for just one example:
// yarn protractor --specs=100-*/**/**.e2e-spec.ts
// Or, at a Bash prompt:
// ./e2e-one.sh 000
