import Component from './component';

import {MINUTES_IN_HOUR} from './util';

export default class FilmComponent extends Component {
  constructor({title, rating, year, duration, genre, poster, description, comments}) {
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
  }

  get _hours() {
    return Math.floor(this._duration / MINUTES_IN_HOUR);
  }

  get _minutes() {
    return this._duration - this._hours * MINUTES_IN_HOUR;
  }
}
