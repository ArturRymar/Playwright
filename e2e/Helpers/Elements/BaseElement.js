export default class {
  constructor(page) {
    this.page = page;
  }
  getElement(selector) {
    return this.page.locator(selector);
  }
  getElementByText(text, exact = true) {
    return this.page.getByText(text, { exact: exact });
  }
}
