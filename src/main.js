import navigation from './navigation';
import {ClassName, Quantity} from './util';
import {getRandomFilm} from './data';
import Film from './film';
import ExtraFilm from './extra-film';
import FilmDetails from './film-details';

const filmContainers = document.querySelectorAll(`.${ ClassName.FILMS.CONTAINER }`);
const filmDetailsParent = document.querySelector(`body`);

const FilmContainer = {
  DEFAULT: filmContainers[0],
  TOP_RATED: filmContainers[1],
  MOST_COMMENTED: filmContainers[2]
};

const generateFilms = (quantity) => new Array(quantity).fill().map(() => getRandomFilm());

const sortFilmsByRating = ({rating: a}, {rating: b}) => b - a;
const sortFilmsByComments = ({comments: a}, {comments: b}) => b.length - a.length;

const allFilms = generateFilms(Quantity.MAX_CARDS.DEFAULT);

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

renderFilms(allFilms, FilmContainer.DEFAULT);
renderFilms(allFilms.sort(sortFilmsByRating), FilmContainer.TOP_RATED, true);
renderFilms(allFilms.sort(sortFilmsByComments), FilmContainer.MOST_COMMENTED, true);
