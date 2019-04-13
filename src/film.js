import moment from 'moment';
import {ClassName, ANIMATION_TIMEOUT} from './util';

import FilmComponent from './film-component';

export default class Film extends FilmComponent {
  constructor(filmData) {
    super(filmData);

    this._buttonComments = null;
    this._buttonWatchList = null;
    this._buttonWatched = null;
    this._buttonFavorite = null;

    this._onCommentClick = null;
    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;
    this._onMarkAsFavorite = null;

    this._onCommentButtonClick = this._onCommentButtonClick.bind(this);
    this._onAddToWatchListClick = this._onAddToWatchListClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
    this._onMarkAsFavoriteClick = this._onMarkAsFavoriteClick.bind(this);
  }

  shake() {
    this._element.style.animation = `${ClassName.SHAKE} ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._element.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  get _contentTemplate() {
    return `
      <h3 class="film-card__title">${ this._title }</h3>
      <p class="film-card__rating">${ this._totalRating }</p>
      <p class="film-card__info">
        <span class="film-card__year">${ moment(this._releaseDate).format(`YYYY`) }</span>
        <span class="film-card__duration">${ moment.duration(this._duration, `minutes`).hours() }:${ moment.duration(this._duration, `minutes`).minutes() }</span>
        <span class="film-card__genre">${ this._genres.length ? [...this._genres][0] : `` }</span>
      </p>
      <img src="${ this._poster }" alt="${ this._title }" class="film-card__poster">
      <p class="film-card__description">${ this._description }</p>
      <button class="film-card__comments">${ this._comments.length } comments</button>

      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    `.trim();
  }

  get _template() {
    return `<article class="film-card">
      ${ this._contentTemplate }
    </article>`.trim();
  }

  set onCommentClick(func) {
    this._onCommentClick = func;
  }

  set onAddToWatchList(func) {
    this._onAddToWatchList = func;
  }

  set onMarkAsWatched(func) {
    this._onMarkAsWatched = func;
  }

  set onMarkAsFavorite(func) {
    this._onMarkAsFavorite = func;
  }

  _onCommentButtonClick(evt) {
    evt.preventDefault();

    if (typeof this._onCommentClick === `function`) {
      this._onCommentClick();
    }
  }

  _onAddToWatchListClick(evt) {
    evt.preventDefault();

    if (typeof this._onAddToWatchList === `function`) {
      const newData = {inWatchList: !this._inWatchList};

      this._onAddToWatchList(newData);
    }
  }

  _onMarkAsWatchedClick(evt) {
    evt.preventDefault();

    if (typeof this._onMarkAsWatched === `function`) {
      const newData = {isWatched: !this._isWatched};

      this._onMarkAsWatched(newData);
    }
  }

  _onMarkAsFavoriteClick(evt) {
    evt.preventDefault();

    if (typeof this._onMarkAsFavorite === `function`) {
      const newData = {isFavorite: !this._isFavorite};

      this._onMarkAsFavorite(newData);
    }
  }

  _getbuttonComments() {
    return this._element.querySelector(`.${ ClassName.BUTTON.COMMENTS }`);
  }

  _getbuttonWatchList() {
    return this._element.querySelector(`.${ ClassName.BUTTON.WATCHLIST }`);
  }

  _getbuttonWatched() {
    return this._element.querySelector(`.${ ClassName.BUTTON.WATCHED }`);
  }

  _getbuttonFavorite() {
    return this._element.querySelector(`.${ ClassName.BUTTON.FAVORITE }`);
  }

  _addEventListener() {
    this._buttonComments.addEventListener(`click`, this._onCommentButtonClick);
    this._buttonWatchList.addEventListener(`click`, this._onAddToWatchListClick);
    this._buttonWatched.addEventListener(`click`, this._onMarkAsWatchedClick);
    this._buttonFavorite.addEventListener(`click`, this._onMarkAsFavoriteClick);
  }

  _removeEventListener() {
    this._buttonComments.removeEventListener(`click`, this._onCommentButtonClick);
    this._buttonWatchList.removeEventListener(`click`, this._onAddToWatchListClick);
    this._buttonWatched.removeEventListener(`click`, this._onMarkAsWatchedClick);
    this._buttonFavorite.removeEventListener(`click`, this._onMarkAsFavoriteClick);
  }

  _updateElementsVariables() {
    this._buttonComments = this._getbuttonComments();
    this._buttonWatchList = this._getbuttonWatchList();
    this._buttonWatched = this._getbuttonWatched();
    this._buttonFavorite = this._getbuttonFavorite();
  }
}
