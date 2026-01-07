import { expect } from '@playwright/test';
import BaseUrl from '../Base Configurations/baseUrl';
import BaseElement from '../Elements/BaseElement';

export default class HomePage extends BaseUrl {
  #baseElement;
  constructor(page, url) {
    super(page, url);
    this.page = page;
    this.#baseElement = new BaseElement(this.page);
  }
  get signUpButton() {
    return this.#baseElement.getElement('.hero-descriptor_btn');
  }
  get signInButton() {
    return this.#baseElement.getElement('.header_signin');
  }
  get loginModal() {
    return this.#baseElement.getElement('app-signin-modal');
  }
  get loginEmail() {
    return this.#baseElement.getElement('#signinEmail');
  }
  get loginPassword() {
    return this.#baseElement.getElement('#signinPassword');
  }
  get loginButton() {
    return this.#baseElement.getElement('app-signin-modal .btn.btn-primary');
  }
  get logoutButton() {
    return this.#baseElement.getElement('.text-danger.btn-sidebar.sidebar_btn');
  }

  async userLogin(email, password, page) {
    await this.loginEmail.type(email);
    expect(this.loginEmail).toHaveValue(email);
    await this.loginPassword.type(password);
    expect(this.loginPassword).toHaveValue(password);
    await this.loginButton.click();
    await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
  }
}
