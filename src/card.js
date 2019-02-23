const DEAFAULT_QUANTITY = 7;
const TOP_QUANTITY = 2;
const MOST_COMMENTED_QUANTITY = 2;

const ClassName = {
  CONTAINER: `films-list__container`
};

const filmsContainer = document.querySelectorAll(`.${ ClassName.CONTAINER }`);

const createCard = ({title, rating, year, duration: {hours, minutes}, genre, img: {path, alt}, description, comments}) =>
  `<article class="film-card">
    <h3 class="film-card__title">${ title }</h3>
    <p class="film-card__rating">${ rating }</p>
    <p class="film-card__info">
      <span class="film-card__year">${ year }</span>
      <span class="film-card__duration">${ hours }h&nbsp;${ minutes }m</span>
      <span class="film-card__genre">${ genre }</span>
    </p>
    <img src="${ path }" alt="${ alt }" class="film-card__poster">
    <p class="film-card__description">${ description }</p>
    <button class="film-card__comments">${ comments } comments</button>

    <form class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
    </form>
  </article>`;

const createExtraCard = ({title, rating, year, duration: {hours, minutes}, genre, img: {path, alt}, comments}) =>
  `<article class="film-card film-card--no-controls">
    <h3 class="film-card__title">${ title }</h3>
    <p class="film-card__rating">${ rating }</p>
    <p class="film-card__info">
      <span class="film-card__year">${ year }</span>
      <span class="film-card__duration">${ hours }h&nbsp;${ minutes }m</span>
      <span class="film-card__genre">${ genre }</span>
    </p>

    <img src="${ path }" alt="${ alt }" class="film-card__poster">

    <button class="film-card__comments">${ comments } comments</button>
  </article>`;

export const renderCards = (quantity = DEAFAULT_QUANTITY) => {
  filmsContainer[0].innerHTML = ``;

  for (let i = 0; i < quantity; i++) {
    filmsContainer[0].insertAdjacentHTML(`afterBegin`, createCard({
      title: `The Assassination Of Jessie James By The Coward Robert Ford`,
      rating: 9.8,
      year: 2018,
      duration: {
        hours: 1,
        minutes: 13
      },
      genre: `Comedy`,
      img: {
        path: `./images/posters/three-friends.jpg`,
        alt: ``
      },
      description: `A priest with a haunted past and a novice on the threshold of her final vows are sent by the Vatican to investigate the death of a young nun in Romania and confront a malevolent force in the form of a demonic nun.`,
      comments: 13
    }));
  }
};

export const renderTopRated = () => {
  for (let i = 0; i < TOP_QUANTITY; i++) {
    filmsContainer[1].insertAdjacentHTML(`afterBegin`, createExtraCard({
      title: `The Assassination Of Jessie James By The Coward Robert Ford`,
      rating: 9.8,
      year: 2018,
      duration: {
        hours: 1,
        minutes: 13
      },
      genre: `Comedy`,
      img: {
        path: `./images/posters/three-friends.jpg`,
        alt: ``
      },
      comments: 13
    }));
  }
};

export const renderMostCommented = () => {
  for (let i = 0; i < MOST_COMMENTED_QUANTITY; i++) {
    filmsContainer[2].insertAdjacentHTML(`afterBegin`, createExtraCard({
      title: `The Assassination Of Jessie James By The Coward Robert Ford`,
      rating: 9.8,
      year: 2018,
      duration: {
        hours: 1,
        minutes: 13
      },
      genre: `Comedy`,
      img: {
        path: `./images/posters/three-friends.jpg`,
        alt: ``
      },
      comments: 13
    }));
  }
};

export const changeCards = (quantity) => {
  renderCards(quantity);
};
