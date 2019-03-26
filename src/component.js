import {createElement} from './util';

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }

    this._element = null;
  }

  get _template() {
    throw new Error(`You have to define template.`);
  }

  get element() {
    return this._element;
  }

  _addEventListener() {}

  _removeEventListener() {}

  update() {}

  render() {
    this._element = createElement(this._template);
    this._addEventListener();

    return this._element;
  }

  unrender() {
    this._removeEventListener();
    this._element.remove();
    this._element = null;
  }
}
