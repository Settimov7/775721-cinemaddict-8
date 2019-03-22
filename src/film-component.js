import Component from './component';

export default class FilmComponent extends Component {
  constructor({title, rating, year, duration, genre, poster, description, comments, date}) {
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
  }

  update({rating, comments}) {
    this._rating = rating;
    this._comments = comments;
  }
}
