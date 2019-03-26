import moment from 'moment';
import {ClassName, createElement} from './util';

import FilmComponent from './film-component';

export default class ExtraFilm extends FilmComponent {
  constructor(dataFilm) {
    super(dataFilm);

    this._buttonComments = null;

    this._onCommentClick = null;
    this._onCommentButtonClick = this._onCommentButtonClick.bind(this);
  }

  get _contentTemplate() {
    return `
      <h3 class="film-card__title">${ this._title }</h3>
      <p class="film-card__rating">${ this._rating }</p>
      <p class="film-card__info">
        <span class="film-card__year">${ moment(this._date).format(`YYYY`) }</span>
        <span class="film-card__duration">${ moment.duration(this._duration, `minutes`).hours() }h&nbsp;${ moment.duration(this._duration, `minutes`).minutes() }m</span>
        <span class="film-card__genre">${ this._genre }</span>
      </p>

      <img src="${ this._poster }" alt="${ this._title }" class="film-card__poster">

      <button class="film-card__comments">${ this._comments.length } comments</button>
    `.trim();
  }

  get _template() {
    return `<article class="film-card film-card--no-controls">
      ${ this._contentTemplate }
    </article>`.trim();
  }

  _onCommentButtonClick(evt) {
    evt.preventDefault();

    if (typeof this._onCommentClick === `function`) {
      this._onCommentClick();
    }
  }

  _getbuttonComments() {
    return this._element.querySelector(`.${ ClassName.BUTTON.COMMENTS }`);
  }

  _addEventListener() {
    this._buttonComments.addEventListener(`click`, this._onCommentButtonClick);
  }

  _removeEventListener() {
    this._buttonComments.removeEventListener(`click`, this._onCommentButtonClick);
  }

  set onCommentClick(func) {
    this._onCommentClick = func;
  }

  render() {
    this._element = createElement(this._template);

    this._buttonComments = this._getbuttonComments();

    this._addEventListener();

    return this._element;
  }
}
