import { test, expect } from '@playwright/test';
import HomePage from './Helpers/Page Objects/Home Page';
import RegistrationModal from './Helpers/Page Objects/Registration';
import data from './Helpers/Base Configurations/data';
import { faker } from '@faker-js/faker';

let homePage;
let registrationModal;
let registrationUser = {
  email: `aqa-${faker.internet.email()}`,
  password: 'Qwerty25',
};

test.describe('Registration suite', () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page, data.homePageUrl);
    registrationModal = new RegistrationModal(page);
    await homePage.navigate();
    await homePage.signUpButton.click();
  });

  test.skip('Registration modal is opened', async () => {
    await expect(registrationModal.modalTitle).toHaveText('Registration');
  });

  //Name field
  test.skip('Name field is required', async () => {
    await registrationModal.signupName.clear();
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Name required')
    ).toBeVisible();
    await expect(registrationModal.signupName).toHaveCSS(
      'border-color',
      'rgb(220, 53, 69)'
    );
  });

  test.skip('Name field has min 2 and max 20 symbols', async () => {
    await registrationModal.signupName.fill('Q');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText(
        'Name has to be from 2 to 20 characters long'
      )
    ).toBeVisible();
    await registrationModal.signupName.clear();
    registrationModal.signupName.fill('Qwertyuiopasdfghjklzx');
    await expect(
      registrationModal.invalidFeedbackBlock.getByText(
        'Name has to be from 2 to 20 characters long'
      )
    ).toBeVisible();
  });

  test.skip('Name field is failed with number, spec symbols and not English', async () => {
    await registrationModal.signupName.clear();
    await registrationModal.signupName.fill('12A');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Name is invalid')
    ).toBeVisible();

    await registrationModal.signupName.clear();
    await registrationModal.signupName.fill('A*');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Name is invalid')
    ).toBeVisible();

    await registrationModal.signupName.clear();
    await registrationModal.signupName.fill('Artур');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Name is invalid')
    ).toBeVisible();
  });

  test.skip('Add valid Name during registration (here is trim)', async () => {
    await registrationModal.signupName.clear();
    await registrationModal.signupName.fill(' Artur');
    const inputtedName = await registrationModal.signupName.inputValue();
    expect(inputtedName.trim()).toEqual('Artur');
  });

  //Last Name field
  test.skip('Last Name field is required', async () => {
    await registrationModal.signupLastName.clear();
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Last name required')
    ).toBeVisible();
    await expect(registrationModal.signupLastName).toHaveCSS(
      'border-color',
      'rgb(220, 53, 69)'
    );
  });

  test.skip('Last Name field has min 2 and max 20 symbols', async () => {
    await registrationModal.signupLastName.fill('Q');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText(
        'Last name has to be from 2 to 20 characters long'
      )
    ).toBeVisible();
    await registrationModal.signupLastName.clear();
    await registrationModal.signupLastName.fill('Qwertyuiopasdfghjklzx');
    await expect(
      registrationModal.invalidFeedbackBlock.getByText(
        'Last name has to be from 2 to 20 characters long'
      )
    ).toBeVisible();
  });

  test.skip('Last Name field is failed with number, spec symbols and not English', async () => {
    await registrationModal.signupLastName.clear();
    await registrationModal.signupLastName.fill('12A');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Last name is invalid')
    ).toBeVisible();

    await registrationModal.signupLastName.clear();
    await registrationModal.signupLastName.fill('A*');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Last name is invalid')
    ).toBeVisible();

    await registrationModal.signupLastName.clear();
    await registrationModal.signupLastName.fill('Artур');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Last name is invalid')
    ).toBeVisible();
  });

  test.skip('Add valid Last Name during registration', async () => {
    await registrationModal.signupLastName.clear();
    await registrationModal.signupLastName.fill('Rymar');
    await expect(registrationModal.signupLastName).toHaveValue('Rymar');
  });

  //Email
  test.skip('Email field is required', async () => {
    await registrationModal.signupEmail.clear();
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Email required')
    ).toBeVisible();
    await expect(registrationModal.signupEmail).toHaveCSS(
      'border-color',
      'rgb(220, 53, 69)'
    );
  });

  test.skip('See error message for invalid email', async () => {
    await registrationModal.signupEmail.clear();
    await registrationModal.signupEmail.fill('test.com'); //missing @
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Email is incorrect')
    ).toBeVisible();

    await registrationModal.signupEmail.clear();
    await registrationModal.signupEmail.fill('test@gmail'); //missing top level domain
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Email is incorrect')
    ).toBeVisible();

    await registrationModal.signupEmail.clear();
    await registrationModal.signupEmail.fill('test@.com'); //missing domain name
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Email is incorrect')
    ).toBeVisible();

    await registrationModal.signupEmail.clear();
    await registrationModal.signupEmail.fill('@gmail.com'); //missing local part
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Email is incorrect')
    ).toBeVisible();

    await registrationModal.signupEmail.clear();
    await registrationModal.signupEmail.fill('artur tester@gmail.com'); //space in local part
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Email is incorrect')
    ).toBeVisible();

    await registrationModal.signupEmail.clear();
    await registrationModal.signupEmail.fill('artur tester@gmail..com'); //two ..
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Email is incorrect')
    ).toBeVisible();
  });

  test.skip('Valid email is acceptable', async () => {
    await registrationModal.signupEmail.clear();
    await registrationModal.signupEmail.fill('tester@gmail.com');
    await expect(registrationModal.signupEmail).toHaveValue('tester@gmail.com');
  });

  //Password
  test.skip('Password field is required', async () => {
    await registrationModal.signupPassword.clear();
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Password required')
    ).toBeVisible();
    await expect(registrationModal.signupPassword).toHaveCSS(
      'border-color',
      'rgb(220, 53, 69)'
    );
  });

  test.skip('Password lenght is min=8 and max=15 symbols', async () => {
    await registrationModal.signupPassword.clear();
    await registrationModal.signupPassword.fill('2');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText(
        'Password has to be from 8 to 15 characters long'
      )
    ).toBeVisible();

    await registrationModal.signupPassword.clear();
    await registrationModal.signupPassword.fill('12345678901234Aa');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText(
        'Password has to be from 8 to 15 characters long'
      )
    ).toBeVisible();
  });

  test.skip('Password contains least one integer, capital, and small letter symbols', async () => {
    await registrationModal.signupPassword.clear();
    await registrationModal.signupPassword.fill('A1');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText(
        'contain at least one integer, one capital, and one small letter'
      )
    ).toBeVisible();

    await registrationModal.signupPassword.clear();
    await registrationModal.signupPassword.fill('a1');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText(
        'contain at least one integer, one capital, and one small letter'
      )
    ).toBeVisible();

    await registrationModal.signupPassword.clear();
    await registrationModal.signupPassword.fill('Aa');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText(
        'contain at least one integer, one capital, and one small letter'
      )
    ).toBeVisible();
  });

  test.skip('Valid password is acceptable', async () => {
    await registrationModal.signupPassword.clear();
    await registrationModal.signupPassword.fill('Qwerty25');
    await expect(registrationModal.signupPassword).toHaveValue('Qwerty25');
  });

  //Re-enter password
  test.skip('Re-enter password field is required', async () => {
    await registrationModal.passwordConfirmation.clear();
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText(
        'Re-enter password required'
      )
    ).toBeVisible();
    await expect(registrationModal.passwordConfirmation).toHaveCSS(
      'border-color',
      'rgb(220, 53, 69)'
    );
  });

  test.skip('Error if Re-enter password and password are differrent', async () => {
    await registrationModal.signupPassword.clear();
    await registrationModal.signupPassword.fill('Qwerty25');
    await registrationModal.passwordConfirmation.clear();
    await registrationModal.passwordConfirmation.fill('Qwerty266565');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Passwords do not match')
    ).toBeVisible();
  });

  test.skip('No error if Re-enter password matches password', async () => {
    await registrationModal.signupPassword.clear();
    await registrationModal.signupPassword.fill('Qwerty25');
    await registrationModal.passwordConfirmation.clear();
    await registrationModal.passwordConfirmation.fill('Qwerty25');
    await registrationModal.modalTitle.click();
    await expect(
      registrationModal.invalidFeedbackBlock.getByText('Passwords do not match')
    ).toBeHidden();
  });

  //Register button
  test.skip('Register buttton is disabled if data is incorrect', async () => {
    //перевірив лише одну умову некоректної дати, не клонив майже однакові тести
    await registrationModal.signupName.clear();
    await registrationModal.signupLastName.clear();
    await registrationModal.signupEmail.clear();
    await registrationModal.signupPassword.clear();
    await registrationModal.passwordConfirmation.clear();
    await expect(registrationModal.registrationButton).toBeDisabled();
  });

  test.skip('Registration successfully submitted', async ({ page }) => {
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
    await expect(registrationModal.registrationButton).toBeEnabled();
    await registrationModal.registrationButton.click();
    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
  });

  test.skip('Registered user can login', async ({ page }) => {
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
    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
    await expect(homePage.logoutButton).toBeVisible();
    await homePage.logoutButton.click();
    await homePage.signInButton.click();
    await homePage.userLogin(
      registrationUser.email,
      registrationUser.password,
      page
    );
  });
});
