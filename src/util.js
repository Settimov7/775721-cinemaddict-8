export const MINUTES_IN_HOUR = 60;

export const ClassName = {
  FILMS_LIST: `films-list__container`,
  BUTTON: {
    COMMENTS: `film-card__comments`,
    CLOSE: `film-details__close-btn`,
  },
};

export const getRandomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

export const getRandomString = (strings) => strings[getRandomNumber(0, strings.length - 1)];

export const createElement = (template) => {
  const newElement = document.createElement(`template`);

  newElement.innerHTML = template.trim();

  return newElement.content.firstChild;
};
