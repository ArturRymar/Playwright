import { test as base } from '@playwright/test';
import HomePage from '../Page Objects/Home Page';
import RegistrationModal from '../Page Objects/Registration';
import data from '../Base Configurations/data';
import { faker } from '@faker-js/faker';
import GaragePage from '../Page Objects/Garage Page';

let registrationUser = {
  email: `aqa-${faker.internet.email()}`,
  password: 'Qwerty25',
};

export const test = base.extend({
  userGaragePage: async ({ page }, use) => {
    let userGaragePage = new GaragePage(page);
    let homePage = new HomePage(page, data.homePageUrl);
    let registrationModal = new RegistrationModal(page);
    await homePage.navigate();
    await homePage.signUpButton.click();
    await registrationModal.signupName.clear();
    await registrationModal.signupName.fill('Tester');
    await registrationModal.signupLastName.clear();
    await registrationModal.signupLastName.fill('Tester');
    await registrationModal.signupEmail.clear();
    await registrationModal.signupEmail.fill(registrationUser.email);
    await registrationModal.signupPassword.clear();
    await registrationModal.signupPassword.fill(registrationUser.password);
    await registrationModal.passwordConfirmation.clear();
    await registrationModal.passwordConfirmation.fill(
      registrationUser.password
    );
    await registrationModal.registrationButton.click();

    await use(userGaragePage);
  },
});
