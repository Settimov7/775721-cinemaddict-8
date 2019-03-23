export const KEY_CODE = {
  ESC: 27,
  ENTER: 13,
};

export const Quantity = {
  CARDS: {
    DEFAULT: 7,
    EXTRA: 2
  }
};

export const ClassName = {
  FILMS: {
    LIST: `films-list`,
    EXTRA_LIST: `films-list--extra`,
    CONTAINER: `films-list__container`,
  },
  BUTTON: {
    COMMENTS: `film-card__comments`,
    CLOSE: `film-details__close-btn`,
  },
  FORM: `film-details__inner`,
  COMMENTS: `film-details__comments-list`,
  COMMENT_TEXTAREA: `film-details__comment-input`,
  COMMENTS_COUNTER: `film-details__comments-count`,
  RATING: {
    TOTAL: `film-details__total-rating`,
    INPUT: `film-details__user-rating-input`,
    CONTAINER: `film-details__user-rating-score`,
  },
};

export const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

export const getRandomString = (strings) => strings[getRandomNumber(0, strings.length - 1)];

export const createElement = (template) => {
  const newElement = document.createElement(`template`);

  newElement.innerHTML = template.trim();

  return newElement.content.firstChild;
};
