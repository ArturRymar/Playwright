import BaseUrl from '../Base Configurations/baseUrl';
import BaseElement from '../Elements/BaseElement';

export default class HomePage extends BaseUrl {
  #baseElement = new BaseElement(this.page);
  constructor(page, url, auth) {
    super(page, url, auth);
    this.page = page;
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

  async userLogin(email, password) {
    await this.loginEmail.type(email);
    await expect(this.loginEmail).toHaveValue(email);
    await this.loginPassword.type(password);
    await expect(this.loginPassword).toHaveValue(password);
    await this.loginButton.click();
    await expect(page).toHaveURl('/panel/garage');
  }
}
