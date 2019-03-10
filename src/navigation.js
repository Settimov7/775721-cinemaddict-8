import {renderCards} from './card';

const ClassName = {
  MAIN_NAVIGATION: `main-navigation`,
  ITEM: `main-navigation__item`,
  ACTIVE: `main-navigation__item--active`,
  COUNT: `main-navigation__item-count`,
  ADDITIONAL: `main-navigation__item--additional`
};

const navigationItems = [
  {
    title: `All movies`,
    href: `#all`,
    isActive: true
  },
  {
    title: `Watchlist`,
    href: `#watchlist`,
    count: 13
  },
  {
    title: `History`,
    href: `#history`,
    count: 4
  },
  {
    title: `Favorites`,
    href: `#Favorites`,
    count: 8
  }
];
const mainNavigation = document.querySelector(`.${ ClassName.MAIN_NAVIGATION }`);

const createItem = ({title, count = 0, href = `#`, isActive = false}) => `<a
    href="${ href }"
    class="${ ClassName.ITEM }${ isActive ? ` ${ ClassName.ACTIVE}` : `` }"
  >${ title }${ count ? `<span class="main-navigation__item-count">${ count }</span>` : ``}</a>`;

const onNavigationClick = (evt) => {
  evt.preventDefault();

  const target = evt.target.closest(`.${ ClassName.ITEM }`);
  const href = target.getAttribute(`href`);

  if (href === `#all` || href === `#stats`) {
    renderCards();
  } else {
    renderCards(parseInt(target.querySelector(`.${ ClassName.COUNT }`).textContent, 10));
  }
};

export default () => {
  navigationItems
    .reverse()
    .forEach((item) => {
      mainNavigation.insertAdjacentHTML(`afterBegin`, createItem(item));
    });

  mainNavigation.addEventListener(`click`, onNavigationClick);
};
