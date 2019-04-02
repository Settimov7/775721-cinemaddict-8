import moment from 'moment';

import {ClassName, KEY_CODE, ANIMATION_TIMEOUT} from './util';

import FilmComponent from './film-component';

const MAX_RATING = 9;

const SmileNameToSmile = {
  'sleeping': `😴`,
  'neutral-face': `😐`,
  'grinning': `😀`,
};

const Color = {
  ERROR: `red`,
  DEFAULT: `#979797`,
  DEFAULT_RATING: `#d8d8d8`,
};

export default class FilmDetails extends FilmComponent {
  constructor(dataFilm) {
    super(dataFilm);

    this._buttonClose = null;
    this._commentTextArea = null;
    this._ratingInputs = null;
    this._ratingLabels = null;
    this._form = null;
    this._labelWatchlist = null;
    this._labelWatched = null;
    this._labelFavorite = null;

    this._onClose = null;
    this._onMessageSubmit = null;
    this._onRating = null;
    this._onAddToWatchList = null;
    this._onMarkAsWatched = null;
    this._onMarkAsFavorite = null;

    this._ratingLabelsArray = null;
    this._ratingInputsArray = null;

    this._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    this._onEscButtonPush = this._onEscButtonPush.bind(this);
    this._onCtrlEnterPush = this._onCtrlEnterPush.bind(this);
    this._onRatingChange = this._onRatingChange.bind(this);
    this._onAddToWatchListClick = this._onAddToWatchListClick.bind(this);
    this._onMarkAsWatchedClick = this._onMarkAsWatchedClick.bind(this);
    this._onMarkAsFavoriteClick = this._onMarkAsFavoriteClick.bind(this);
  }

  get _commentsTemplate() {
    return `
      <ul class="film-details__comments-list">
        ${ this._comments.map((comment) => (`
          <li class="film-details__comment">
            <span class="film-details__comment-emoji">${ SmileNameToSmile[comment.emotion] }</span>
            <div>
              <p class="film-details__comment-text">${ comment.comment }</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${ comment.author }</span>
                <span class="film-details__comment-day">${ moment(comment.date).fromNow() }</span>
              </p>
            </div>
          </li>
        `.trim())).join(``) }
      </ul>
    `.trim();
  }

  get _contentTemplate() {
    return `
    <form class="film-details__inner" action="" method="get">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${ this._poster }" alt="${ this._title }">

            <p class="film-details__age">${ this._ageRating }+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${ this._title }</h3>
                <p class="film-details__title-original">${ this._alternativeTitle }</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${ this._totalRating }</p>
                ${ this._rating ? `<p class="film-details__user-rating">Your rate ${ this._rating }</p>` : ``}
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${ this._director }</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${ [...this._writers].join(`, `) }</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${ [...this._actors].join(`, `) }</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${ moment(this._date).format(`DD MMMM YYYY`) } (USA)</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${ moment.duration(this._duration, `minutes`).asMinutes() } min</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${ this._releaseCountry }</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                   ${ [...this._genres].map((genre) => `
                      <span class="film-details__genre">${ genre }</span>
                    `.trim()).join(``)}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${ this._description }
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${ this._inWatchList ? `checked` : `` }>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">${ this._inWatchList ? `Already in watchlist` : `Add to watchlist` }</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${ this._isWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">${ this._isWatched ? `Already in watched` : `Add to watched` }</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${ this._isFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">${ this._isFavorite ? `Already in favorites` : `Add to favorites` }</label>
        </section>

        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${ this._comments.length }</span></h3>

          ${ this._commentsTemplate }

          <div class="film-details__new-comment">
            <div>
              <label for="add-emoji" class="film-details__add-emoji-label">😐</label>
              <input type="checkbox" class="film-details__add-emoji visually-hidden" id="add-emoji">

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">😴</label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-neutral-face" value="neutral-face" checked>
                <label class="film-details__emoji-label" for="emoji-neutral-face">😐</label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-grinning" value="grinning">
                <label class="film-details__emoji-label" for="emoji-grinning">😀</label>
              </div>
            </div>
            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="← Select reaction, add comment here" name="comment"></textarea>
            </label>
          </div>
        </section>

        <section class="film-details__user-rating-wrap">
          <div class="film-details__user-rating-controls">
            <span class="film-details__watched-status film-details__watched-status--active">Already watched</span>
            <button class="film-details__watched-reset" type="button">undo</button>
          </div>

          <div class="film-details__user-score">
            <div class="film-details__user-rating-poster">
              <img src="${ this._poster }" alt="${ this._title }" class="film-details__user-rating-img">
            </div>

            <section class="film-details__user-rating-inner">
              <h3 class="film-details__user-rating-title">${ this._title }</h3>

              <p class="film-details__user-rating-feelings">How you feel it?</p>

              <div class="film-details__user-rating-score">
                ${ (new Array(MAX_RATING)
                      .fill()
                      .map((value, index) => (`
                        <input
                          type="radio"
                          name="score"
                          class="film-details__user-rating-input visually-hidden"
                          value="${ index + 1 }"
                          id="rating-${ index + 1 }"
                          ${ this._rating === index + 1 ? `checked` : ``}>
                        <label class="film-details__user-rating-label" for="rating-${ index + 1 }">${ index + 1 }</label>
                      `))).join(``) }
              </div>
            </section>
          </div>
        </section>
      </form>
    `.trim();
  }

  get _template() {
    return `<section class="film-details">
      ${ this._contentTemplate }
    </section>`.trim();
  }

  set onClose(func) {
    this._onClose = func;
  }

  set onRating(func) {
    this._onRating = func;
  }

  set onMessageSubmit(func) {
    this._onMessageSubmit = func;
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

  _processForm(formData) {
    const entry = {
      rating: this._rating,
      comments: this._comments,
    };

    const taskEditMapper = FilmDetails.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  _processRating(formData) {
    const entry = {
      rating: null,
    };

    const taskEditMapper = FilmDetails.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (property === `score` && taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  _processComment(formData) {
    const entry = {
      emotion: null,
      comments: this._comments,
    };

    const taskEditMapper = FilmDetails.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;
      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  static createMapper(target) {
    return {
      'comment-emoji': (value) => {
        if (value) {
          target.emotion = value;
        }
      },
      'comment': (value) => {
        if (value) {
          target.comments.push({
            emotion: target.emotion,
            comment: value,
            author: `Author`,
            date: new Date()
          });
        }
      },
      'score': (value) => {
        target.rating = parseInt(value, 10);
      },
    };
  }

  _close() {
    const formData = new FormData(this._element.querySelector(`.${ ClassName.FORM }`));
    const newData = this._processForm(formData);

    if (typeof this._onClose === `function`) {
      this._onClose(newData);
    }
  }

  _onCloseButtonClick(evt) {
    evt.preventDefault();

    this._close();
  }

  _onEscButtonPush(evt) {
    evt.preventDefault();

    if (evt.keyCode === KEY_CODE.ESC) {
      this._close();
    }
  }

  _onCtrlEnterPush(evt) {
    evt.preventDefault();

    if (evt.ctrlKey && evt.keyCode === KEY_CODE.ENTER && typeof this._onMessageSubmit === `function`) {
      const formData = new FormData(this._element.querySelector(`.${ ClassName.FORM }`));
      const newData = this._processComment(formData);

      this._onMessageSubmit(newData);
    }
  }

  _onRatingChange(evt) {
    const target = evt.target.closest(`.${ ClassName.RATING.INPUT }`);

    if (target && typeof this._onRating === `function`) {
      const formData = new FormData(this._element.querySelector(`.${ ClassName.FORM }`));
      const newData = this._processRating(formData);

      this._onRating(newData);
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

  _getButtonClose() {
    return this._element.querySelector(`.${ ClassName.BUTTON.CLOSE }`);
  }

  _getCommentTextArea() {
    return this._element.querySelector(`.${ ClassName.COMMENT_TEXTAREA}`);
  }

  _getForm() {
    return this._element.querySelector(`.${ ClassName.FORM }`);
  }

  _getLabelWatchlist() {
    return this._element.querySelector(`.${ ClassName.LABEL.WATCHLIST }`);
  }

  _getLabelWatched() {
    return this._element.querySelector(`.${ ClassName.LABEL.WATCHED }`);
  }

  _getLabelFavorite() {
    return this._element.querySelector(`.${ ClassName.LABEL.FAVORITE }`);
  }

  _getRatingInputs() {
    return this._element.querySelectorAll(`.${ ClassName.RATING.INPUT }`);
  }

  _getRatingLabels() {
    return this._element.querySelectorAll(`.${ ClassName.RATING.LABEL }`);
  }

  _addEventListener() {
    this._buttonClose.addEventListener(`click`, this._onCloseButtonClick);
    document.addEventListener(`keyup`, this._onEscButtonPush);
    this._commentTextArea.addEventListener(`keyup`, this._onCtrlEnterPush);
    this._form.addEventListener(`change`, this._onRatingChange);

    this._labelWatchlist.addEventListener(`click`, this._onAddToWatchListClick);
    this._labelWatched.addEventListener(`click`, this._onMarkAsWatchedClick);
    this._labelFavorite.addEventListener(`click`, this._onMarkAsFavoriteClick);
  }

  _removeEventListener() {
    this._buttonClose.removeEventListener(`click`, this._onCloseButtonClick);
    document.removeEventListener(`keyup`, this._onEscButtonPush);
    this._commentTextArea.removeEventListener(`keyup`, this._onCtrlEnterPush);
    this._form.removeEventListener(`change`, this._onRatingChange);

    this._labelWatchlist.removeEventListener(`click`, this._onAddToWatchListClick);
    this._labelWatched.removeEventListener(`click`, this._onMarkAsWatchedClick);
    this._labelFavorite.removeEventListener(`click`, this._onMarkAsFavoriteClick);
  }

  _updateElementsVariables() {
    this._buttonClose = this._getButtonClose();
    this._commentTextArea = this._getCommentTextArea();
    this._ratingInputs = this._getRatingInputs();
    this._form = this._getForm();
    this._labelWatchlist = this._getLabelWatchlist();
    this._labelWatched = this._getLabelWatched();
    this._labelFavorite = this._getLabelFavorite();
    this._ratingLabels = this._getRatingLabels();
    this._ratingLabelsArray = [...this._ratingLabels];
    this._ratingInputsArray = [...this._ratingInputs];
  }

  shakeMessageForm() {
    this._commentTextArea.style.animation = `${ClassName.SHAKE} ${ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._commentTextArea.style.animation = ``;
    }, ANIMATION_TIMEOUT);
  }

  addErrorStylesToMessageForm() {
    this._commentTextArea.style.borderColor = Color.ERROR;
  }

  removeErrorStylesFromMessageForm() {
    this._commentTextArea.style.borderColor = Color.DEFAULT;
  }

  disableMessageForm() {
    this._commentTextArea.disabled = true;
  }

  enableMessageForm() {
    this._commentTextArea.disabled = false;
  }

  disableRating() {
    this._ratingInputsArray.forEach((input) => {
      input.disabled = true;
    });
  }

  enableRating() {
    this._ratingInputsArray.forEach((input) => {
      input.disabled = false;
    });
  }

  addErrorStylesToRating() {
    this._ratingInputsArray.forEach((input, index) => {
      if (input.checked) {
        this._ratingLabelsArray[index].style.backgroundColor = Color.ERROR;
      }
    });
  }

  removeErrorStylesFromRating() {
    this._ratingLabelsArray.forEach((label) => {
      label.style.backgroundColor = Color.DEFAULT_RATING;
    });
  }

  shakeMessageRating() {
    this._ratingInputsArray.forEach((input, index) => {
      if (input.checked) {
        this._ratingLabelsArray[index].style.animation = `${ClassName.SHAKE} ${ANIMATION_TIMEOUT / 1000}s`;

        setTimeout(() => {
          this._ratingLabelsArray[index].style.animation = ``;
        }, ANIMATION_TIMEOUT);
      }
    });
  }
}
