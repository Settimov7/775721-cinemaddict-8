import Component from './component';

import {ClassName, createElement} from './util';
import {getRandomFilm} from './data';
import Film from './film';
import FilmDetails from './film-details';
import ExtraFilm from './extra-film';

const body = document.querySelector(`body`);

export default class Films extends Component {
  constructor({title, quantity, isExtra = false}) {
    super();

    this._title = title;
    this._quantity = quantity;
    this._isExtra = isExtra;

    this._items = null;
  }

  get _template() {
    return `
      <section class="${ this._isExtra ? ClassName.FILMS.EXTRA_LIST : ClassName.FILMS.LIST }">
        <h2 class="films-list__title ${ this._isExtra ? `` : `visually-hidden`}">${ this._title }</h2>
        <div class="films-list__container"></div>
        ${ this._isExtra ? `` : `<button class="films-list__show-more">Show more</button>`}
      </section>`.trim();
  }

  renderItems() {
    this._items = [];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < this._quantity; i++) {
      const data = getRandomFilm();

      const film = this._isExtra ? new ExtraFilm(data) : new Film(data);
      const filmDetails = new FilmDetails(data);

      film.onCommentClick = () => {
        body.append(filmDetails.render());
      };

      filmDetails.onClose = () => {
        filmDetails.element.parentElement.removeChild(filmDetails.element);
        filmDetails.unrender();
      };

      fragment.appendChild(film.render());
      this._items.push(film);
    }

    this._element.querySelector(`.${ ClassName.FILMS.CONTAINER }`).appendChild(fragment);
  }

  unrenderItems() {
    this._items.forEach((item) => {
      item.unrender();
    });
  }

  changeItems(quantity) {
    this.unrenderItems();
    this._quantity = quantity;
    this.renderItems();
  }

  render() {
    this._element = createElement(this._template);
    this._addEventListeners();
    this.renderItems();
    return this._element;
  }

  unrender() {
    this._removeEventListener();
    this.unrenderItems();
    this._element.remove();
    this._element = null;
  }
}
