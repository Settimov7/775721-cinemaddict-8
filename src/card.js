import {ClassName} from './util';
import {getRandomFilm} from './data';

import Film from './film';
import ExtraFilm from './extra-film';

const Quantity = {
  CARDS: 7,
  TOP: 2,
  MOST_COMMENTED: 2
};

const filmsContainers = document.querySelectorAll(`.${ ClassName.FILMS_LIST }`);
const Container = {
  DEFAULT: filmsContainers[0],
  TOP_RATED: filmsContainers[1],
  MOST_COMMENTED: filmsContainers[2]
};

const createCards = (quantity) => {
  let cards = document.createDocumentFragment();

  for (let i = 0; i < quantity; i++) {
    cards.appendChild(new Film(getRandomFilm()).render());
  }

  return cards;
};

export const renderCards = (quantity) => {
  const newFilmsContainer = Container.DEFAULT.cloneNode(false);

  newFilmsContainer.appendChild(createCards(quantity));
  Container.DEFAULT.parentElement.replaceChild(newFilmsContainer, Container.DEFAULT);
  Container.DEFAULT = newFilmsContainer;
};

export const renderDefaultCards = () => {
  const newFilmsContainer = Container.DEFAULT.cloneNode(false);

  newFilmsContainer.appendChild(createCards(Quantity.CARDS));
  Container.DEFAULT.parentElement.replaceChild(newFilmsContainer, Container.DEFAULT);
  Container.DEFAULT = newFilmsContainer;
};

const createExtraCards = (quantity) => {
  let cards = document.createDocumentFragment();

  for (let i = 0; i < quantity; i++) {
    cards.appendChild(new ExtraFilm(getRandomFilm()).render());
  }

  return cards;
};

export const renderTopRated = () => {
  const newFilmsContainer = Container.TOP_RATED.cloneNode(false);

  newFilmsContainer.appendChild(createExtraCards(Quantity.TOP));
  Container.TOP_RATED.parentElement.replaceChild(newFilmsContainer, Container.TOP_RATED);
  Container.TOP_RATED = newFilmsContainer;
};

export const renderMostCommented = () => {
  const newFilmsContainer = Container.MOST_COMMENTED.cloneNode(false);

  newFilmsContainer.appendChild(createExtraCards(Quantity.MOST_COMMENTED));
  Container.MOST_COMMENTED.parentElement.replaceChild(newFilmsContainer, Container.MOST_COMMENTED);
  Container.MOST_COMMENTED = newFilmsContainer;
};

export const changeCards = (quantity = Quantity.CARDS) => {
  renderCards(quantity);
};
