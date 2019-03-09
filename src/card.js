import {ClassName} from './util';
import {getRandomFilm} from './data';

import Film from './film';
import ExtraFilm from './extra-film';
import FilmDetails from './film-details';

const Quantity = {
  CARDS: {
    DEFAULT: 7,
    EXTRA: 2
  }
};

const filmsContainers = document.querySelectorAll(`.${ ClassName.FILMS_LIST }`);

const Container = {
  DEFAULT: filmsContainers[0],
  TOP_RATED: filmsContainers[1],
  MOST_COMMENTED: filmsContainers[2]
};

const createCards = (quantity) => {
  const cards = document.createDocumentFragment();

  for (let i = 0; i < quantity; i++) {
    const film = getRandomFilm();
    const filmComponent = new Film(film);
    const filmDetailsComponent = new FilmDetails(film);

    filmComponent.onCommentClick = () => {
      document.querySelector(`body`).append(filmDetailsComponent.render());
    };

    filmDetailsComponent.onClose = () => {
      filmDetailsComponent.element.parentElement.removeChild(filmDetailsComponent.element);
      filmDetailsComponent.unrender();
    };

    cards.appendChild(filmComponent.render());
  }

  return cards;
};

const createExtraCards = () => {
  let cards = document.createDocumentFragment();

  for (let i = 0; i < Quantity.CARDS.EXTRA; i++) {
    const film = getRandomFilm();
    const extraFilmComponent = new ExtraFilm(film);
    const filmDetailsComponent = new FilmDetails(film);

    extraFilmComponent.onCommentClick = () => {
      document.querySelector(`body`).append(filmDetailsComponent.render());
    };

    filmDetailsComponent.onClose = () => {
      filmDetailsComponent.element.parentElement.removeChild(filmDetailsComponent.element);
      filmDetailsComponent.unrender();
    };

    cards.appendChild(extraFilmComponent.render());
  }

  return cards;
};

const render = (container, cards) => {
  const newContainer = container.cloneNode(false);

  newContainer.appendChild(cards);
  container.parentElement.replaceChild(newContainer, container);

  return newContainer;
};

export const renderCards = (quantity = Quantity.CARDS.DEFAULT) => {
  Container.DEFAULT = render(Container.DEFAULT, createCards(quantity));
};

export const renderTopCards = () => {
  Container.TOP_RATED = render(Container.TOP_RATED, createExtraCards());
};

export const renderMostCommentedCards = () => {
  Container.MOST_COMMENTED = render(Container.MOST_COMMENTED, createExtraCards());
};
