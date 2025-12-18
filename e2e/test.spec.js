import { test, expect } from '@playwright/test';
import HomePage from './Helpers/Page Objects/Home Page';
import data from './Helpers/Base Configurations/data';

test.describe('Example of visit', () => {
  test('visit home page', async ({ page }) => {
    // let homePage = new HomePage(page, data.homePageUrl, data.authentication);
    await page.goto('https://example.cypress.io');
    await expect(page).toHaveURL('https://example.cypress.io');
    // await homePage.navigate();
    // await homePage.signInButton.click();
    // await homePage.userLogin('arturauto@gmail.com', 'Qwerty25');
  });
});
