import {ClassName} from './util';
import FilmComponent from './film-component';

export default class Film extends FilmComponent {
  constructor(filmData) {
    super(filmData);

    this._onCommentClick = null;
    this._onCommentButtonClick = this._onCommentButtonClick.bind(this);
  }

  get _template() {
    return `<article class="film-card">
      <h3 class="film-card__title">${ this._title }</h3>
      <p class="film-card__rating">${ this._rating }</p>
      <p class="film-card__info">
        <span class="film-card__year">${ this._year }</span>
        <span class="film-card__duration">${ this._hours }h&nbsp;${ this._minutes }m</span>
        <span class="film-card__genre">${ this._genre }</span>
      </p>
      <img src="${ this._poster }" alt="${ this._title }" class="film-card__poster">
      <p class="film-card__description">${ this._description }</p>
      <button class="film-card__comments">${ this._comments.length } comments</button>

      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`.trim();
  }

  _onCommentButtonClick(evt) {
    evt.preventDefault();

    if (typeof this._onCommentClick === `function`) {
      this._onCommentClick();
    }
  }

  _addEventListener() {
    this._element.querySelector(`.${ ClassName.BUTTON.COMMENTS }`).addEventListener(`click`, this._onCommentButtonClick);
  }

  _removeEventListener() {
    this._element.querySelector(`.${ ClassName.BUTTON.COMMENTS }`).removeEventListener(`click`, this._onCommentButtonClick);
  }

  set onCommentClick(func) {
    this._onCommentClick = func;
  }
}
