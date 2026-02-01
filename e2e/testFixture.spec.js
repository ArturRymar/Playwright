import { expect } from '@playwright/test';
import { test } from './Helpers/Fixtures/userGaragePage';

test.describe('Test with fixture', () => {
  test('Test case one', async ({ userGaragePage, page }) => {
    userGaragePage.openAddCarModalButton.click();
    await expect(userGaragePage.addCarModalHeader).toBeVisible();

    let storageExample = await page.evaluate(async () => {
      localStorage.setItem('test', 'test_value');
      return localStorage.getItem('test');
    });
    console.log(storageExample);
  });
});
