import navigation from './navigation';
import {ClassName, Quantity} from './util';
import Films from './films';

const filmList = document.querySelector(`.${ ClassName.FILMS.LIST }`);
const filmExtraLists = document.querySelectorAll(`.${ ClassName.FILMS.EXTRA_LIST }`);

const FilmExtraList = {
  TOP_RATED: filmExtraLists[0],
  MOST_COMMENTED: filmExtraLists[1]
};

const films = new Films({title: `All movies. Upcoming`, quantity: Quantity.CARDS.DEFAULT});
const topfilms = new Films({title: `Top rated`, quantity: Quantity.CARDS.EXTRA, isExtra: true});
const mostCommentedfilms = new Films({title: `Most commented`, quantity: Quantity.CARDS.EXTRA, isExtra: true});

navigation(films);

filmList.replaceWith(films.render());
FilmExtraList.TOP_RATED.replaceWith(topfilms.render());
FilmExtraList.MOST_COMMENTED.replaceWith(mostCommentedfilms.render());
