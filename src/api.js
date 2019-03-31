import ModelFilm from './model-film';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

export const STATUS_CODE_OK_RANGE = {
  MIN: 200,
  MAX: 300
};

const checkStatus = (response) => {
  if (response.status >= STATUS_CODE_OK_RANGE.MIN && response.status < STATUS_CODE_OK_RANGE.MAX) {
    return response;
  } else {
    throw new Error(`${ response.status }: ${ response.statusText }`);
  }
};

export default class Api {
  constructor({path, authorization}) {
    this._path = path;
    this._authorization = authorization;
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${ this._path }/${ url }`, {method, body, headers})
      .then(checkStatus);
  }

  get(url) {
    return this._load({url})
      .then((response) => response.json())
      .then((data) => ModelFilm.parseData(data));
  }

  update(url, id, data) {
    return this._load({
      url: `${ url }/${ id }`,
      method: Method.PUT,
      body: JSON.stringify(data.parseBack()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json());
  }
}
