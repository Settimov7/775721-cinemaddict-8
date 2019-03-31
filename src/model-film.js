export default class ModelFilm {
  constructor(data) {
    console.log(data);
    this.id = data[`id`];
    this.comments = data[`comments`].map(({author, emotion, comment, date}) => ({
      author,
      emotion,
      comment,
      date: new Date(date)
    }));
    this.actors = [...new Set(data[`film_info`][`actors`])];
    this.ageRating = data[`film_info`][`age_rating`];
    this.alternativeTitle = data[`film_info`][`alternative_title`];
    this.description = data[`film_info`][`description`];
    this.director = data[`film_info`][`director`];
    this.genres = [...new Set(data[`film_info`][`genre`])];
    this.poster = data[`film_info`][`poster`];
    this.releaseDate = new Date(data[`film_info`][`release`][`date`]);
    this.releaseCountry = data[`film_info`][`release`][`release_country`];
    this.duration = data[`film_info`][`runtime`];
    this.title = data[`film_info`][`title`];
    this.totalRating = data[`film_info`][`total_rating`];
    this.writers = [...new Set(data[`film_info`][`writers`])];
    this.isWatched = data[`user_details`][`already_watched`];
    this.isFavorite = data[`user_details`][`favorite`];
    this.rating = parseInt(data[`user_details`][`personal_rating`], 10);
    this.inWatchList = data[`user_details`][`watchlist`];
  }

  static parseItem(data) {
    return new ModelFilm(data);
  }

  static parseData(data) {
    return data.map((item) => ModelFilm.parseItem(item));
  }

  parseBack() {
    return {
      'id': this.id,
      'film_info': {
        'actors': this.actors,
        'age_rating': this.ageRating,
        'alternative_title': this.alternativeTitle,
        'description': this.description,
        'director': this.director,
        'poster': this.poster,
        'release': {
          'date': Date.parse(this.releaseDate),
          'release_country': this.releaseCountry,
        },
        'runtime': this.duration,
        'title': this.title,
        'total_rating': this.totalRating,
        'writers': this.writers,
      },
      'comments': this.comments,
      'user_details': {
        'already_watched': !!this.isWatched,
        'favorite': !!this.isFavorite,
        'personal_rating': this.rating,
        'watchlist': !!this.inWatchList,
      }
    };
  }
}
