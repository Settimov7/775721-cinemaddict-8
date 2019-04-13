import Component from './component';

export default class FilmComponent extends Component {
  constructor({id, title, alternativeTitle, totalRating, rating, releaseDate, duration, genres, poster, description,
    comments, ageRating, director, writers, actors, releaseCountry, watchingDate,
    inWatchList = false, isWatched = false, isFavorite = false}) {
    super();

    if (new.target === FilmComponent) {
      throw new Error(`Can't instantiate FilmComponent, only concrete one.`);
    }

    this._id = id;
    this._title = title;
    this._alternativeTitle = alternativeTitle;
    this._totalRating = totalRating;
    this._rating = rating;
    this._releaseDate = releaseDate;
    this._duration = duration;
    this._genres = genres;
    this._poster = poster;
    this._description = description;
    this._comments = comments;
    this._ageRating = ageRating;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._releaseCountry = releaseCountry;
    this._watchingDate = watchingDate;
    this._inWatchList = inWatchList;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
  }

  get id() {
    return this._id;
  }

  get _contentTemplate() {}

  updateElement() {
    if (this._element) {
      this._removeEventListener();
      this._element.innerHTML = this._contentTemplate;
      this._updateElementsVariables();
      this._addEventListener();
    }
  }

  update({rating, comments, inWatchList, isWatched, isFavorite, watchingDate}) {
    this._rating = rating;
    this._comments = comments;
    this._watchingDate = watchingDate;
    this._inWatchList = inWatchList;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;

    this.updateElement();
  }
}
