import Component from './component';
import {ClassName} from "./util";

export default class Search extends Component {
  constructor() {
    super();

    this._searchField = null;

    this._onInputSearch = null;

    this._onInput = this._onInput.bind(this);
  }

  get _template() {
    return `
      <form class="header__search search">
        <input type="text" name="search" class="search__field" placeholder="Search">
        <button type="submit" class="visually-hidden">Search</button>
      </form>
    `.trim();
  }

  get value() {
    return this._searchField.value;
  }

  set onInputSearch(func) {
    this._onInputSearch = func;
  }

  reset() {
    this._searchField.value = ``;
  }

  _onInput(evt) {
    evt.preventDefault();
    if (typeof this._onInputSearch === `function`) {
      this._onInputSearch();
    }
  }

  _getSearchField() {
    return this._element.querySelector(`.${ ClassName.SEARCH }`);
  }

  _addEventListener() {
    this._searchField.addEventListener(`input`, this._onInput);
  }

  _updateElementsVariables() {
    this._searchField = this._getSearchField();
  }
}
