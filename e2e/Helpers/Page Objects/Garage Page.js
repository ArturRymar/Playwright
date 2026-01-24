import BaseElement from '../Elements/BaseElement';

export default class GaragePage {
  #baseElement;
  constructor(page) {
    this.page = page;
    this.#baseElement = new BaseElement(page);
  }

  get openAddCarModalButton() {
    return this.#baseElement.getElement('.panel-page .btn.btn-primary');
  }
  get addCarModalHeader() {
    return this.#baseElement.getElement('app-add-car-modal .modal-header');
  }
}
