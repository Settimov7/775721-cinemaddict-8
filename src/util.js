export const KEY_CODE = {
  ESC: 27,
  ENTER: 13,
};

export const Quantity = {
  MAX_CARDS: {
    DEFAULT: 5,
    EXTRA: 2
  }
};

export const ClassName = {
  MAIN: `main`,
  MAIN_NAVIGATION: `main-navigation`,
  FILMS: {
    DEFAULT: `films`,
    LIST: `films-list`,
    EXTRA_LIST: `films-list--extra`,
    CONTAINER: `films-list__container`,
    SHOW_MORE: `films-list__show-more`,
    DETAILS: `film-details`,
    COUNTER: `footer__statistics`,
    RATING: `profile__rating`,
  },
  BUTTON: {
    COMMENTS: `film-card__comments`,
    CLOSE: `film-details__close-btn`,
    WATCHLIST: `film-card__controls-item--add-to-watchlist`,
    WATCHED: `film-card__controls-item--mark-as-watched`,
    FAVORITE: `film-card__controls-item--favorite`
  },
  LABEL: {
    WATCHLIST: `film-details__control-label--watchlist`,
    WATCHED: `film-details__control-label--watched`,
    FAVORITE: `film-details__control-label--favorite`,
  },
  FORM: `film-details__inner`,
  COMMENTS: `film-details__comments-list`,
  COMMENT_TEXTAREA: `film-details__comment-input`,
  COMMENTS_COUNTER: `film-details__comments-count`,
  DELETE_COMMENT: `film-details__watched-reset`,
  RATING: {
    TOTAL: `film-details__total-rating`,
    INPUT: `film-details__user-rating-input`,
    LABEL: `film-details__user-rating-label`,
    CONTAINER: `film-details__user-rating-score`,
    CONTROLS: `film-details__user-rating-controls`,
  },
  FILTER: {
    DEFAULT: `main-navigation__item`,
    ACTIVE: `main-navigation__item--active`,
    ADDITIONAL: `main-navigation__item--additional`,
    COUNTER: `main-navigation__item-count`,
  },
  BODY: `body`,
  VISUALLY_HIDDEN: `visually-hidden`,
  STATISTIC: {
    DEFAULT: `statistic`,
    CHART: `statistic__chart`,
    BUTTON: `main-navigation__item--additional`,
    TEXT: `statistic__item-text`,
  },
  SHAKE: `shake`,
  SEARCH: `search__field`,
};

export const ANIMATION_TIMEOUT = 600;

export const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

export const getRandomString = (strings) => strings[getRandomNumber(0, strings.length - 1)];

export const getRandomBoolean = () => [true, false][getRandomNumber(0, 1)];

export const createElement = (template) => {
  const newElement = document.createElement(`template`);

  newElement.innerHTML = template.trim();

  return newElement.content.firstChild;
};

export const hideElement = (element) => {
  element.classList.add(ClassName.VISUALLY_HIDDEN);
};

export const showElement = (element) => {
  element.classList.remove(ClassName.VISUALLY_HIDDEN);
};
