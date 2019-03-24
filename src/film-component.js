import Component from './component';

export default class FilmComponent extends Component {
  constructor({title, rating, year, duration, genre, poster, description, comments, date, inWatchList = false, isWatched = false, isFavorite = false}) {
    super();

    if (new.target === FilmComponent) {
      throw new Error(`Can't instantiate FilmComponent, only concrete one.`);
    }

    this._title = title;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genre = genre;
    this._poster = poster;
    this._description = description;
    this._comments = comments;
    this._date = date;
    this._inWatchList = inWatchList;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;
  }

  get _contentTemplate() {}

  updateElement() {
    if (this._element) {
      this._removeEventListener();
      this._element.innerHTML = this._contentTemplate;
      this._addEventListener();
    }
  }

  update({rating, comments, inWatchList, isWatched, isFavorite}) {
    this._rating = rating;
    this._comments = comments;
    this._inWatchList = inWatchList;
    this._isWatched = isWatched;
    this._isFavorite = isFavorite;

    this.updateElement();
  }
}
