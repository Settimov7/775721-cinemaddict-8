import {MINUTES_IN_HOUR, createElement, ClassName} from './util';

export default class ExtraFilm {
  constructor({title, rating, year, duration, genre, poster, description, comments}) {
    this._title = title;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genre = genre;
    this._poster = poster;
    this._description = description;
    this._comments = comments;

    this._element = null;
    this._onCommentClick = null;
    this._onCommentButtonClick = this._onCommentButtonClick.bind(this);
  }

  get _hours() {
    return Math.floor(this._duration / MINUTES_IN_HOUR);
  }

  get _minutes() {
    return this._duration - this._hours * MINUTES_IN_HOUR;
  }

  get _template() {
    return `<article class="film-card film-card--no-controls">
      <h3 class="film-card__title">${ this._title }</h3>
      <p class="film-card__rating">${ this._rating }</p>
      <p class="film-card__info">
        <span class="film-card__year">${ this._year }</span>
        <span class="film-card__duration">${ this._hours }h&nbsp;${ this._minutes }m</span>
        <span class="film-card__genre">${ this._genre }</span>
      </p>

      <img src="${ this._poster }" alt="${ this._title }" class="film-card__poster">

      <button class="film-card__comments">${ this._comments.length } comments</button>
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

  get element() {
    return this._element;
  }

  set onCommentClick(func) {
    this._onCommentClick = func;
  }

  render() {
    this._element = createElement(this._template);
    this._addEventListener();

    return this._element;
  }

  unrender() {
    this._removeEventListener();
    this._element = null;
  }
}
