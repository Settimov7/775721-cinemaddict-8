import {getRandomFilm} from './data';

const Quantity = {
  CARDS: 7,
  TOP: 2,
  MOST_COMMENTED: 2
};

const MINUTES_IN_HOUR = 60;

const ClassName = {
  CONTAINER: `films-list__container`
};

const filmsContainer = document.querySelectorAll(`.${ ClassName.CONTAINER }`);

const calcHours = (duration) => Math.floor(duration / MINUTES_IN_HOUR);
const calcMinutes = (duration) => duration - calcHours(duration) * MINUTES_IN_HOUR;

const createCard = ({title, rating, year, duration, genre, poster, description, comments}) => {
  return `<article class="film-card">
      <h3 class="film-card__title">${ title }</h3>
      <p class="film-card__rating">${ rating }</p>
      <p class="film-card__info">
        <span class="film-card__year">${ year }</span>
        <span class="film-card__duration">${ calcHours(duration) }h&nbsp;${ calcMinutes(duration) }m</span>
        <span class="film-card__genre">${ genre }</span>
      </p>
      <img src="${ poster }" alt="${ title }" class="film-card__poster">
      <p class="film-card__description">${ description }</p>
      <button class="film-card__comments">${ comments.length } comments</button>

      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`;
};

const createCards = (quantity) => {
  let cards = ``;

  for (let i = 0; i < quantity; i++) {
    cards += createCard(getRandomFilm());
  }

  return cards;
};

export const renderCards = (quantity) => {
  filmsContainer[0].innerHTML = createCards(quantity);
};

export const renderDefaultCards = () => {
  filmsContainer[0].innerHTML = createCards(Quantity.CARDS);
};

const createExtraCard = ({title, rating, year, duration, genre, poster, comments}) =>
  `<article class="film-card film-card--no-controls">
    <h3 class="film-card__title">${ title }</h3>
    <p class="film-card__rating">${ rating }</p>
    <p class="film-card__info">
      <span class="film-card__year">${ year }</span>
      <span class="film-card__duration">${ calcHours(duration) }h&nbsp;${ calcMinutes(duration) }m</span>
      <span class="film-card__genre">${ genre }</span>
    </p>

    <img src="${ poster }" alt="${ title }" class="film-card__poster">

    <button class="film-card__comments">${ comments.length } comments</button>
  </article>`;

const createExtraCards = (quantity) => {
  let cards = ``;

  for (let i = 0; i < quantity; i++) {
    cards += createExtraCard(getRandomFilm());
  }

  return cards;
};

export const renderTopRated = () => {
  filmsContainer[1].innerHTML = createExtraCards(Quantity.TOP);
};

export const renderMostCommented = () => {
  filmsContainer[2].innerHTML = createExtraCards(Quantity.MOST_COMMENTED);
};

export const changeCards = (quantity = Quantity.CARDS) => {
  renderCards(quantity);
};
