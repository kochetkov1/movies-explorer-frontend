/* eslint no-underscore-dangle: 0 */
/* eslint no-param-reassign: "error" */

const _handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(({ message, error }) => {
    res.message = message || error || `Ошибка. Запрос не выполнен: ${res.status}`;
    return Promise.reject(res);
  });
};

export class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
    this._movies = JSON.parse(localStorage.getItem('saved-movies') || '[]');
  }

  setToken(jwt) {
    this._headers.Authorization = `Bearer ${jwt}`;
  }

  // Запросы данных пользователя

  createUser({ name, email, password }) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then(_handleServerResponse);
  }

  login({ email, password }) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(_handleServerResponse);
  }

  getCurrentUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(_handleServerResponse);
  }

  updateUser({ name, email }) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    }).then(_handleServerResponse);
  }

  // Запросы данных фильмов

  getMovies() {
    if (this._movies.length === 0) {
      return fetch(`${this._url}/movies`, {
        method: 'GET',
        headers: this._headers,
      })
        .then(_handleServerResponse)
        .then((movies) => {
          this._movies = movies;
          localStorage.setItem('saved-movies', JSON.stringify(movies));
          return movies;
        });
    }
    return Promise.resolve(this._movies);
  }

  createMovie(film) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(film),
    })
      .then(_handleServerResponse)
      .then((movie) => {
        this._movies.push(movie);
        localStorage.setItem('saved-movies', JSON.stringify(this._movies));
        return movie;
      });
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(_handleServerResponse)
      .then((movie) => {
        this._movies = this._movies.filter((movieItem) => movieItem._id !== id);
        localStorage.setItem('saved-movies', JSON.stringify(this._movies));
        return movie;
      });
  }
}

const mainApi = new MainApi({
  url: 'https://api.kochetkov111.nomoredomains.club',
  headers: {
    'content-type': 'application/json',
    Authorization: '',
  },
});

export default mainApi;
