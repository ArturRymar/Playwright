export default class {
  constructor(page) {
    this.page = page;
  }
  getElement(selector) {
    return this.page.locator(selector);
  }
  getElementByText(text) {
    return this.page.getByText(text);
  }
}
