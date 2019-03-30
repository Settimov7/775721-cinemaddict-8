/* eslint-disable */

export default class ModelFilm {
  constructor({id, comments,
    film_info: {actors, age_rating, alternative_title, description, director, genre, poster, release, runtime, title,
      total_rating, writers},
    user_details: {already_watched, favorite, personal_rating, watchlist}}) {
    this.id = id;
    this.comments = comments.map(({author, emotion, comment, date}) => ({
      author,
      emotion,
      comment,
      date: new Date(date)
    }));
    this.actors = [...new Set(actors)];
    this.ageRating = age_rating;
    this.alternativeTitle = alternative_title;
    this.description = description;
    this.director = director;
    this.genres = [...new Set(genre)];
    this.poster = poster;
    this.releaseDate = new Date(release.date);
    this.releaseCountry = release[`release_country`];
    this.duration = runtime;
    this.title = title;
    this.totalRating = total_rating;
    this.writers = [...new Set(writers)];
    this.isWatched = already_watched;
    this.isFavorite = favorite;
    this.rating = parseInt(personal_rating);
    this.inWatchList = watchlist;
  }

  /* eslint-enable */
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
