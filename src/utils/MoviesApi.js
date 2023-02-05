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

export class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
    this._movies = JSON.parse(localStorage.getItem('local-movies') || '[]');
  }

  getMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: this._headers,
    }).then(_handleServerResponse);
  }

  createMovie(card) {
    const localCard = this._movies.find(
      (localCardItem) => localCardItem.id === card.movieId,
    );
    if (localCard) {
      localCard._id = card._id;
      localCard.movieId = localCard.id;
      localCard.thumbnail = `https://api.nomoreparties.co${localCard.image.url}`;
      localCard.saved = true;
    }
    localStorage.setItem('local-movies', JSON.stringify(this._movies));
    return this._movies;
  }

  deleteMovie(id) {
    this._movies = this._movies.map((movie) => {
      if (movie.id === id) {
        movie.saved = false;
      }
      return movie;
    });
    localStorage.setItem('local-movies', JSON.stringify(this._movies));
    return this._movies;
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-type': 'application/json',
    Authorization: '',
  },
});

export default moviesApi;
