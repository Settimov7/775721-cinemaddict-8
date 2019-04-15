import ModelFilm from "./model-film";

const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

export default class Provider {
  constructor(api, store, generateId) {
    this._api = api;
    this._store = store;
    this._generateId = generateId;
    this._needSync = false;
  }

  _isOnline() {
    return window.navigator.onLine;
  }

  update(url, id, data) {
    if (this._isOnline()) {
      return this._api.update(url, id, data)
        .then((item) => {
          this._store.setItem(item.id, item);

          return item;
        });
    } else {
      const item = data.parseBack();
      this._needSync = true;
      this._store.setItem(item.id, item);

      return Promise.resolve(item);
    }
  }

  get(url) {
    if (this._isOnline()) {
      return this._api.get(url)
        .then((items) => {
          items.map((item) => this._store.setItem(item.id, item.parseBack()));

          return items;
        });
    } else {
      const itemsObject = this._store.getAll();
      const itemsArray = objectToArray(itemsObject);
      const items = ModelFilm.parseData(itemsArray);

      return Promise.resolve(items);
    }
  }

  syncTasks(url) {
    return this._api.syncTasks(url, objectToArray(this._store.getAll()));
  }
}
