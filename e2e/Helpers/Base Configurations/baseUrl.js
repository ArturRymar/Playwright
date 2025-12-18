export default class BaseUrl {
  constructor(page, url, auth) {
    this.url = url;
    this.auth = auth;
    this.page = page;
  }
  async navigate() {
   await this.page.goto(this.url, { auth: this.auth });
  }
}
