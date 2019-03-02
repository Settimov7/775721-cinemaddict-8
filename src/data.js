const Restrictions = {
  RATING: {
    MIN: 1,
    MAX: 10
  },
  YEAR: {
    MIN: 1970,
    MAX: 2019
  },
  DURATION: {
    MIN: 60,
    MAX: 180
  },
  MAX_COMMENTS: 3,
  DESCRIPTION_LENGTH: 3
};

const TITLES = [
  `The Shawshank Redemption`,
  `Pulp Fiction`,
  `Inception`,
  `The Dark Knight`,
  `Interstellar`,

  `Fight Club`,
  `Forrest Gump`,
  `The Matrix`,
  `Saving Private Ryan`,
  `Leon`,

  `The Green Mile`,
  `Avengers: Infinity War`,
  `Django Unchained`,
  `Good Will Hunting`,
  `Scarface`,
];

const GENRES = [
  `Adventure`,
  `Action`,
  `Drama`,
  `Detective`,
  `Animation`,
  `Biography`,
  `History`,
  `Fantasy`,
  `Western`
];

const POSTERS = [
  `./images/posters/accused.jpg`,
  `./images/posters/blackmail.jpg`,
  `./images/posters/blue-blazes.jpg`,
  `./images/posters/fuga-da-new-york.jpg`,
  `./images/posters/moonrise.jpg`,
  `./images/posters/three-friends.jpg`
];

const DESCRIPTION = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna,
  non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex,
  convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit,
  eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.
  Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`.split(`.`);

const COMMENTS = [`comment`, `big comment`, `small comment`, `good comment`, ` bad comment`];

const randomNumber = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

const randomString = (strings) => strings[randomNumber(0, strings.length - 1)];

const randomComments = () => {
  const comments = new Array(randomNumber(0, Restrictions.MAX_COMMENTS))
                .fill()
                .map(() => COMMENTS[randomNumber(0, COMMENTS.length - 1)]);
  return comments;
};

const randomDescription = () => {
  return new Array(Restrictions.DESCRIPTION_LENGTH)
          .fill()
          .map(() => DESCRIPTION[randomNumber(0, DESCRIPTION.length - 1)])
          .join(` `);
};

export const getRandomFilm = () => {
  return {
    title: randomString(TITLES),
    rating: randomNumber(Restrictions.RATING.MIN, Restrictions.RATING.MAX),
    year: randomNumber(Restrictions.YEAR.MIN, Restrictions.YEAR.MAX),
    duration: randomNumber(Restrictions.DURATION.MIN, Restrictions.DURATION.MAX),
    genre: randomString(GENRES),
    description: randomDescription(),
    poster: randomString(POSTERS),
    comments: randomComments(),
  };
};
