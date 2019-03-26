import {ClassName, Quantity} from './util';
import {getRandomFilm} from './data';
import Stastic from './statistic';

import Film from './film';
import ExtraFilm from './extra-film';
import FilmDetails from './film-details';
import Filter from './filter';

const main = document.querySelector(`.${ ClassName.MAIN }`);

const filmsElement = document.querySelector(`.${ ClassName.FILMS.DEFAULT }`);
const filmContainers = document.querySelectorAll(`.${ ClassName.FILMS.CONTAINER }`);
const filmDetailsParent = document.querySelector(`${ ClassName.BODY }`);

const mainNavigation = document.querySelector(`.${ ClassName.MAIN_NAVIGATION }`);

const FilmContainer = {
  DEFAULT: filmContainers[0],
  TOP_RATED: filmContainers[1],
  MOST_COMMENTED: filmContainers[2]
};

const generateFilms = (quantity) => new Array(quantity).fill().map(() => getRandomFilm());

const sortFilmsByRating = ({rating: a}, {rating: b}) => b - a;
const sortFilmsByComments = ({comments: a}, {comments: b}) => b.length - a.length;

const allFilms = generateFilms(Quantity.MAX_CARDS.DEFAULT);
let watchList = allFilms.filter((film) => film.inWatchList);
let watchedFilms = allFilms.filter((film) => film.isWatched);
let favoritesFilms = allFilms.filter((film) => film.isFavorite);

const statistic = new Stastic(watchedFilms);

const filtersData = [
  {
    title: `All movies`,
    href: `#all`,
    isAdditional: false,
    isActive: true
  },
  {
    title: `Watchlist`,
    href: `#watchlist`,
    count: watchList.length,
    isAdditional: false,
  },
  {
    title: `History`,
    href: `#history`,
    count: watchedFilms.length,
    isAdditional: false,
  },
  {
    title: `Favorites`,
    href: `#favorites`,
    count: favoritesFilms.length,
    isAdditional: false,
  },
  {
    title: `Stats`,
    href: `#stats`,
    isAdditional: true,
  },
];

const showFilms = () => {
  if (statistic.element) {
    filmsElement.classList.remove(`${ ClassName.VISUALLY_HIDDEN }`);
    statistic.unrender();
  }
};

const renderFilters = (filters) => {
  const fragment = document.createDocumentFragment();

  filters.forEach((filter) => {
    filter.onFilter = (typeFilter) => {
      const activeFilter = findActiveFilter(filters);

      activeFilter.changeStatus();
      filterFilms(typeFilter);
    };

    fragment.appendChild(filter.render());
  });

  mainNavigation.appendChild(fragment);
};

const showStatistic = () => {
  if (!statistic.element) {
    filmsElement.classList.add(`${ ClassName.VISUALLY_HIDDEN }`);

    main.appendChild(statistic.render());
  } else {
    statistic.updateElement(watchedFilms);
  }
};

const filterFilms = (typeFilter) => {
  switch (typeFilter) {
    case `#all`: {
      FilmContainer.DEFAULT.innerHTML = ``;
      showFilms();
      renderFilms(allFilms, FilmContainer.DEFAULT);
      currentFilter = typeFilter;
      break;
    }

    case `#watchlist`: {
      FilmContainer.DEFAULT.innerHTML = ``;
      showFilms();
      renderFilms(watchList, FilmContainer.DEFAULT);
      currentFilter = typeFilter;
      break;
    }

    case `#history`: {
      FilmContainer.DEFAULT.innerHTML = ``;
      showFilms();
      renderFilms(watchedFilms, FilmContainer.DEFAULT);
      currentFilter = typeFilter;
      break;
    }

    case `#favorites`: {
      FilmContainer.DEFAULT.innerHTML = ``;
      showFilms();
      renderFilms(favoritesFilms, FilmContainer.DEFAULT);
      currentFilter = typeFilter;
      break;
    }

    case `#stats`: {
      showStatistic();
      currentFilter = typeFilter;
      break;
    }
  }
};

const updateFilms = () => {
  FilmContainer.TOP_RATED.innerHTML = ``;
  FilmContainer.MOST_COMMENTED.innerHTML = ``;

  renderFilms(allFilms.sort(sortFilmsByRating), FilmContainer.TOP_RATED, true);
  renderFilms(allFilms.sort(sortFilmsByComments), FilmContainer.MOST_COMMENTED, true);

  watchList = allFilms.filter((film) => film.inWatchList);
  watchedFilms = allFilms.filter((film) => film.isWatched);
  favoritesFilms = allFilms.filter((film) => film.isFavorite);

  statistic.update(watchedFilms);

  filterFilms(currentFilter);
};

const renderFilms = (films, container, isExtra = false) => {
  const fragment = document.createDocumentFragment();
  const maxFilms = isExtra ? Quantity.MAX_CARDS.EXTRA : Quantity.MAX_CARDS.DEFAULT;

  for (let i = 0; i < (films.length < maxFilms ? films.length : maxFilms); i++) {
    let filmData = films[i];
    const film = isExtra ? new ExtraFilm(filmData) : new Film(filmData);
    let filmDetails = new FilmDetails(filmData);

    film.onCommentClick = () => {
      if (!filmDetails.element) {
        filmDetailsParent.append(filmDetails.render());
      }
    };

    film.onAddToWatchList = ({inWatchList}) => {
      filmData.inWatchList = inWatchList;
      film.update(filmData);

      filmDetails.update(filmData);
      updateFilms();

      filters.find((filter) => filter.getHref === `#watchlist`).update(watchList.length);
    };

    film.onMarkAsWatched = ({isWatched}) => {
      filmData.isWatched = isWatched;
      film.update(filmData);

      filmDetails.update(filmData);
      updateFilms();

      filters.find((filter) => filter.getHref === `#history`).update(watchedFilms.length);
    };

    film.onMarkAsFavorite = ({isFavorite}) => {
      filmData.isFavorite = isFavorite;
      film.update(filmData);

      filmDetails.update(filmData);
      updateFilms();

      filters.find((filter) => filter.getHref === `#favorites`).update(favoritesFilms.length);
    };

    filmDetails.onClose = () => {
      filmDetails.element.parentElement.removeChild(filmDetails.element);
      filmDetails.unrender();
    };

    filmDetails.onMessageSubmit = ({comments}) => {
      filmData.comments = comments;

      film.update(filmData);
      film.element.replaceWith(film.render());

      filmDetails.update(filmData);
      updateFilms();
    };

    filmDetails.onRating = ({rating}) => {
      filmData.rating = rating;

      film.update(filmData);
      film.element.replaceWith(film.render());

      filmDetails.update(filmData);
      updateFilms();
    };

    filmDetails.onAddToWatchList = ({inWatchList}) => {
      filmData.inWatchList = inWatchList;
      film.update(filmData);

      filmDetails.update(filmData);
      updateFilms();

      filters.find((filter) => filter.getHref === `#watchlist`).update(watchList.length);
    };

    filmDetails.onMarkAsWatched = ({isWatched}) => {
      filmData.isWatched = isWatched;
      film.update(filmData);

      filmDetails.update(filmData);
      updateFilms();

      filters.find((filter) => filter.getHref === `#history`).update(watchedFilms.length);
    };

    filmDetails.onMarkAsFavorite = ({isFavorite}) => {
      filmData.isFavorite = isFavorite;
      film.update(filmData);

      filmDetails.update(filmData);
      updateFilms();

      filters.find((filter) => filter.getHref === `#favorites`).update(favoritesFilms.length);
    };

    fragment.appendChild(film.render());
  }

  container.appendChild(fragment);
};

const findActiveFilter = (items) => items.find((item) => {
  return item.isActive;
});

const createFilters = (data) => data.map((item) => new Filter(item));
const filters = createFilters(filtersData);
let currentFilter = null;

renderFilters(filters);

renderFilms(allFilms, FilmContainer.DEFAULT);
renderFilms(allFilms.sort(sortFilmsByRating), FilmContainer.TOP_RATED, true);
renderFilms(allFilms.sort(sortFilmsByComments), FilmContainer.MOST_COMMENTED, true);


