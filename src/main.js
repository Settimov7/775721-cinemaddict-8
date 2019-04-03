import {ClassName, Quantity, showElement, hideElement} from './util';
import Api from './api';
import Provider from './provider';

import Stastic from './statistic';
import Film from './film';
import ExtraFilm from './extra-film';
import FilmDetails from './film-details';
import Filter from './filter';
import Store from "./store";

const FILMS_PATH = `https://es8-demo-srv.appspot.com/moowle/`;
const FILMS_URL = `movies`;
const AUTHORIZATION = `Basic eo0dasdada889a`;
const STORE_KEY = `films-store-key`;

const filmsApi = new Api({
  path: FILMS_PATH,
  authorization: AUTHORIZATION
});
const store = new Store(STORE_KEY, localStorage);
const provider = new Provider(filmsApi, store, () => String(Date.now()));

window.addEventListener(`offline`, () => {
  document.title = `${document.title}[OFFLINE]`;
});

window.addEventListener(`online`, () => {
  document.title = document.title.split(`[OFFLINE]`)[0];
  provider.syncTasks(FILMS_URL);
});

const main = document.querySelector(`.${ ClassName.MAIN }`);

const filmsElement = document.querySelector(`.${ ClassName.FILMS.DEFAULT }`);
const filmContainers = document.querySelectorAll(`.${ ClassName.FILMS.CONTAINER }`);
const filmDetailsParent = document.querySelector(`${ ClassName.BODY }`);
const showMore = document.querySelector(`.${ ClassName.FILMS.SHOW_MORE }`);
const filmsCounter = document.querySelector(`.${ ClassName.FILMS.COUNTER }`);
const userRating = document.querySelector(`.${ ClassName.FILMS.RATING }`);

const search = document.querySelector(`.${ ClassName.SEARCH }`);

const mainNavigation = document.querySelector(`.${ ClassName.MAIN_NAVIGATION }`);

const FilmContainer = {
  DEFAULT: filmContainers[0],
  TOP_RATED: filmContainers[1],
  MOST_COMMENTED: filmContainers[2]
};

const RATINGS = {
  NOVICE: {
    TITLE: `novice`,
    RESTRICTIONS: {
      MIN: 1,
      MAX: 10
    },
  },
  FUN: {
    TITLE: `fun`,
    RESTRICTIONS: {
      MIN: 11,
      MAX: 19
    },
  },
  BUFF: {
    TITLE: `movie buff`,
    RESTRICTIONS: {
      MIN: 20,
    },
  }
};

const sortFilmsByRating = ({totalRating: a}, {totalRating: b}) => b - a;

const sortFilmsByComments = ({comments: a}, {comments: b}) => b.length - a.length;

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
      currentMaxQuantityFilms = Quantity.MAX_CARDS.DEFAULT;
      activeFilter.changeStatus();
      search.value = ``;
      searchValue = ``;
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
      renderFilms(searchFilms(allFilms), FilmContainer.DEFAULT);
      currentFilter = typeFilter;
      currentFilteredFilms = allFilms.length;
      checkFilmsQuantity();
      break;
    }

    case `#watchlist`: {
      FilmContainer.DEFAULT.innerHTML = ``;
      showFilms();
      renderFilms(searchFilms(watchList), FilmContainer.DEFAULT);
      currentFilter = typeFilter;
      currentFilteredFilms = watchList.length;
      checkFilmsQuantity();
      break;
    }

    case `#history`: {
      FilmContainer.DEFAULT.innerHTML = ``;
      showFilms();
      renderFilms(searchFilms(watchedFilms), FilmContainer.DEFAULT);
      currentFilter = typeFilter;
      currentFilteredFilms = watchedFilms.length;
      checkFilmsQuantity();
      break;
    }

    case `#favorites`: {
      FilmContainer.DEFAULT.innerHTML = ``;
      showFilms();
      renderFilms(searchFilms(favoritesFilms), FilmContainer.DEFAULT);
      currentFilter = typeFilter;
      currentFilteredFilms = favoritesFilms.length;
      checkFilmsQuantity();
      break;
    }

    case `#stats`: {
      showStatistic();
      currentFilter = typeFilter;
      break;
    }
  }
};

const searchFilms = (films) => films.filter((film) => film.title.toLowerCase().includes(searchValue.toLowerCase()));

const updateFilms = () => {
  FilmContainer.TOP_RATED.innerHTML = ``;
  FilmContainer.MOST_COMMENTED.innerHTML = ``;

  renderFilms(allFilms.sort(sortFilmsByRating), FilmContainer.TOP_RATED, true);
  renderFilms(allFilms.sort(sortFilmsByComments), FilmContainer.MOST_COMMENTED, true);

  watchList = allFilms.filter((film) => film.inWatchList);
  watchedFilms = allFilms.filter((film) => film.isWatched);
  favoritesFilms = allFilms.filter((film) => film.isFavorite);

  statistic.update(watchedFilms);
  updateRating(watchedFilms.length);
  filterFilms(currentFilter);
};

const renderFilms = (films, container, isExtra = false) => {
  const fragment = document.createDocumentFragment();
  const maxFilms = isExtra ? Quantity.MAX_CARDS.EXTRA : currentMaxQuantityFilms;

  for (let i = 0; i < (films.length < maxFilms ? films.length : maxFilms); i++) {
    let filmData = films[i];
    const film = isExtra ? new ExtraFilm(filmData) : new Film(filmData);
    let filmDetails = new FilmDetails(filmData);

    film.onCommentClick = () => {
      if (currentFilmDetails && currentFilmDetails.element) {
        currentFilmDetails.unrender();
      }

      if (!filmDetails.element) {
        currentFilmDetails = filmDetails;
        filmDetailsParent.append(filmDetails.render());
      }
    };

    film.onAddToWatchList = ({inWatchList}) => {
      filmData.inWatchList = inWatchList;
      provider.update(FILMS_URL, film.id, filmData)
        .then(() => {
          film.update(filmData);

          filmDetails.update(filmData);
          updateFilms();

          filters.find((filter) => filter.getHref === `#watchlist`).update(watchList.length);
        })
        .catch(() => film.shake());
    };

    film.onMarkAsWatched = ({isWatched}) => {
      filmData.isWatched = isWatched;
      provider.update(FILMS_URL, film.id, filmData)
        .then(() => {
          film.update(filmData);

          filmDetails.update(filmData);
          updateFilms();

          filters.find((filter) => filter.getHref === `#history`).update(watchedFilms.length);
        })
        .catch(() => film.shake());
    };

    film.onMarkAsFavorite = ({isFavorite}) => {
      filmData.isFavorite = isFavorite;
      provider.update(FILMS_URL, film.id, filmData)
        .then(() => {
          film.update(filmData);

          filmDetails.update(filmData);
          updateFilms();

          filters.find((filter) => filter.getHref === `#favorites`).update(favoritesFilms.length);
        })
        .catch(() => film.shake());
    };

    filmDetails.onClose = () => {
      filmDetails.element.parentElement.removeChild(filmDetails.element);
      filmDetails.unrender();
    };

    filmDetails.onMessageSubmit = ({comments}) => {
      filmDetails.removeErrorStylesFromMessageForm();

      filmData.comments = comments;

      filmDetails.disableMessageForm();

      provider.update(FILMS_URL, film.id, filmData)
        .then(() => {
          film.update(filmData);
          film.element.replaceWith(film.render());

          filmDetails.update(filmData);
          filmDetails.enableMessageForm();
          updateFilms();
        })
        .catch(() => {
          filmDetails.enableMessageForm();
          filmDetails.addErrorStylesToMessageForm();
          filmDetails.shakeMessageForm();
        });
    };

    filmDetails.onMessageDelete = ({comments}) => {
      filmData.comments = comments;

      provider.update(FILMS_URL, film.id, filmData)
        .then(() => {
          film.update(filmData);
          film.element.replaceWith(film.render());

          filmDetails.update(filmData);
          updateFilms();
        });
    };

    filmDetails.onRating = ({rating}) => {
      filmDetails.removeErrorStylesFromRating();

      filmData.rating = rating;

      filmDetails.disableRating();

      provider.update(FILMS_URL, film.id, filmData)
        .then(() => {
          film.update(filmData);
          film.element.replaceWith(film.render());

          filmDetails.update(filmData);
          filmDetails.enableRating();
          updateFilms();
        })
        .catch(() => {
          filmDetails.enableRating();
          filmDetails.addErrorStylesToRating();
          filmDetails.shakeMessageRating();
        });
    };

    filmDetails.onAddToWatchList = ({inWatchList}) => {
      filmData.inWatchList = inWatchList;
      provider.update(FILMS_URL, film.id, filmData);

      film.update(filmData);

      filmDetails.update(filmData);
      updateFilms();

      filters.find((filter) => filter.getHref === `#watchlist`).update(watchList.length);
    };

    filmDetails.onMarkAsWatched = ({isWatched}) => {
      filmData.isWatched = isWatched;
      provider.update(FILMS_URL, film.id, filmData);

      film.update(filmData);

      filmDetails.update(filmData);
      updateFilms();

      filters.find((filter) => filter.getHref === `#history`).update(watchedFilms.length);
    };

    filmDetails.onMarkAsFavorite = ({isFavorite}) => {
      filmData.isFavorite = isFavorite;
      provider.update(FILMS_URL, film.id, filmData);

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

const addLoadingMessage = () => {
  FilmContainer.DEFAULT.innerHTML = `Loading movies...`;
};

const addErrorMessage = () => {
  FilmContainer.DEFAULT.innerHTML = `Something went wrong while loading movies. Check your connection or try again later`;
};

const removeMessage = () => {
  FilmContainer.DEFAULT.innerHTML = ``;
};

const checkFilmsQuantity = () => {
  if (currentFilteredFilms <= currentMaxQuantityFilms) {
    hideElement(showMore);
  } else {
    showElement(showMore);
  }
};

const onShowMoreClick = () => {
  if (currentMaxQuantityFilms < currentFilteredFilms) {
    currentMaxQuantityFilms += Quantity.MAX_CARDS.DEFAULT;

    filterFilms(currentFilter);
  }
};

const updateFilmsCounter = (quantity) => {
  filmsCounter.innerHTML = `<p>${ quantity } movies inside</p>`;
};

const updateRating = (quantity) => {
  let rating = ``;
  if (quantity >= RATINGS.NOVICE.RESTRICTIONS.MIN && quantity <= RATINGS.NOVICE.RESTRICTIONS.MAX) {
    rating = RATINGS.NOVICE.TITLE;
  }

  if (quantity >= RATINGS.FUN.RESTRICTIONS.MIN && quantity <= RATINGS.FUN.RESTRICTIONS.MAX) {
    rating = RATINGS.FUN.TITLE;
  }

  if (quantity >= RATINGS.BUFF.RESTRICTIONS.MIN) {
    rating = RATINGS.BUFF.TITLE;
  }

  userRating.textContent = rating;
};

const onSearch = () => {
  searchValue = search.value;
  filterFilms(currentFilter);
};

const startApplication = (films) => {
  allFilms = films;

  watchList = allFilms.filter((film) => film.inWatchList);
  watchedFilms = allFilms.filter((film) => film.isWatched);
  favoritesFilms = allFilms.filter((film) => film.isFavorite);

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
  filters = createFilters(filtersData);
  statistic = new Stastic(watchedFilms);

  removeMessage();
  currentFilteredFilms = allFilms.length;
  checkFilmsQuantity();
  updateFilmsCounter(allFilms.length);
  updateRating(watchedFilms.length);
  renderFilms(allFilms, FilmContainer.DEFAULT);
  renderFilms(allFilms.sort(sortFilmsByRating), FilmContainer.TOP_RATED, true);
  renderFilms(allFilms.sort(sortFilmsByComments), FilmContainer.MOST_COMMENTED, true);

  renderFilters(filters);
  showMore.addEventListener(`click`, onShowMoreClick);
  search.addEventListener(`input`, onSearch);
};

let allFilms = [];

let watchList = [];
let watchedFilms = [];
let favoritesFilms = [];

let filters = [];
let currentFilter = `#all`;
let currentMaxQuantityFilms = Quantity.MAX_CARDS.DEFAULT;
let currentFilteredFilms = null;
let currentFilmDetails = null;

let statistic = null;

let searchValue = ``;

addLoadingMessage();

provider.get(FILMS_URL)
  .then(startApplication)
  .catch(() => {
    addErrorMessage();
  });


