export default class BaseUrl {
  constructor(page, url) {
    this.url = url;
    this.page = page;
  }
  async navigate() {
   await this.page.goto(this.url);
  }
}
