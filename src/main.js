import {ClassName, Quantity} from './util';
import {getRandomFilm} from './data';

import Film from './film';
import ExtraFilm from './extra-film';
import FilmDetails from './film-details';
import Filter from './filter';

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
const watchList = allFilms.filter((film) => film.inWatchList);
const watchedFilms = allFilms.filter((film) => film.isWatched);
const favoritesFilms = allFilms.filter((film) => film.isFavorite);

const filtersData = [
  {
    title: `All movies`,
    href: `#all`,
    isActive: true
  },
  {
    title: `Watchlist`,
    href: `#watchlist`,
    count: watchList.length
  },
  {
    title: `History`,
    href: `#history`,
    count: watchedFilms.length
  },
  {
    title: `Favorites`,
    href: `#favorites`,
    count: favoritesFilms.length
  }
];

const filterFilms = (typeFilter) => {
  switch (typeFilter) {
    case `#all`: {
      FilmContainer.DEFAULT.innerHTML = ``;
      renderFilms(allFilms, FilmContainer.DEFAULT);
      break;
    }

    case `#watchlist`: {
      FilmContainer.DEFAULT.innerHTML = ``;
      renderFilms(watchList, FilmContainer.DEFAULT);
      break;
    }

    case `#history`: {
      FilmContainer.DEFAULT.innerHTML = ``;
      renderFilms(watchedFilms, FilmContainer.DEFAULT);
      break;
    }

    case `#favorites`: {
      FilmContainer.DEFAULT.innerHTML = ``;
      renderFilms(favoritesFilms, FilmContainer.DEFAULT);
      break;
    }
  }
};

const updateFilms = () => {
  FilmContainer.TOP_RATED.innerHTML = ``;
  FilmContainer.MOST_COMMENTED.innerHTML = ``;

  renderFilms(allFilms.sort(sortFilmsByRating), FilmContainer.TOP_RATED, true);
  renderFilms(allFilms.sort(sortFilmsByComments), FilmContainer.MOST_COMMENTED, true);
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
    };

    film.onMarkAsWatched = ({isWatched}) => {
      filmData.isWatched = isWatched;
      film.update(filmData);

      filmDetails.update(filmData);
    };

    film.onMarkAsFavorite = ({isFavorite}) => {
      filmData.isFavorite = isFavorite;
      film.update(filmData);

      filmDetails.update(filmData);
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
    };

    filmDetails.onMarkAsWatched = ({isWatched}) => {
      filmData.isWatched = isWatched;
      film.update(filmData);

      filmDetails.update(filmData);
    };

    filmDetails.onMarkAsFavorite = ({isFavorite}) => {
      filmData.isFavorite = isFavorite;
      film.update(filmData);

      filmDetails.update(filmData);
    };

    fragment.appendChild(film.render());
  }

  container.appendChild(fragment);
};

const findActiveFilter = (items) => items.find((item) => {
  return item.isActive;
});

const createFilters = (data) => data.map((item) => new Filter(item));

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

  mainNavigation.insertBefore(fragment, mainNavigation.firstChild);
};

renderFilters(createFilters(filtersData));

renderFilms(allFilms, FilmContainer.DEFAULT);
renderFilms(allFilms.sort(sortFilmsByRating), FilmContainer.TOP_RATED, true);
renderFilms(allFilms.sort(sortFilmsByComments), FilmContainer.MOST_COMMENTED, true);
