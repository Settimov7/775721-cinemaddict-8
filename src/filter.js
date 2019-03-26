import Component from './component';

import {ClassName} from './util';

export default class Filter extends Component {
  constructor({title, href = `#`, count = null, isAdditional = false, isActive = false}) {
    super();

    this._title = title;
    this._count = count;
    this._href = href;
    this._isAdditional = isAdditional;

    this._state = {
      isActive
    };

    this._onFilter = null;

    this._onLabelClick = this._onLabelClick.bind(this);
  }

  get isActive() {
    return this._state.isActive;
  }

  get getHref() {
    return this._href;
  }

  set onFilter(func) {
    this._onFilter = func;
  }

  get _template() {
    return `
      <a
      href="${ this._href }"
      class="main-navigation__item ${ this._state.isActive ? ` ${ ClassName.FILTER.ACTIVE}` : `` } ${this._isAdditional ? ` ${ ClassName.FILTER.ADDITIONAL }` : ``}"
    >${ this._title }${ this._title !== `All movies` && this._title !== `Stats` ? `<span class="${ ClassName.FILTER.COUNTER }">${ this._count }</span>` : ``}</a>
    `.trim();
  }

  _onLabelClick(evt) {
    evt.preventDefault();

    const target = evt.target.closest(`.${ ClassName.FILTER.DEFAULT }`);

    if (target && !this._state.isActive && typeof this._onFilter === `function`) {
      const href = this._href;
      this._onFilter(href);

      this.changeStatus();
    }
  }

  changeStatus() {
    this._state.isActive = !this._state.isActive;

    this._element.classList.toggle(`${ ClassName.FILTER.ACTIVE}`);
  }

  update(count) {
    this._count = count;

    this._element.querySelector(`.${ ClassName.FILTER.COUNTER }`).textContent = this._count;
  }

  _addEventListener() {
    this._element.addEventListener(`click`, this._onLabelClick);
  }

  _removeEventListener() {
    this._element.removeEventListener(`click`, this._onLabelClick);
  }
}
