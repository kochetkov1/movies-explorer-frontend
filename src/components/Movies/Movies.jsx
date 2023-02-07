/* eslint no-param-reassign: "error" */
import React from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm.jsx';
import MoviesCardList from './MoviesCardList/MoviesCardList.jsx';
import moviesApi from '../../utils/MoviesApi.js';
import mainApi from '../../utils/MainApi.js';
import { numberOfMovies } from '../../utils/Utils.js';

function Movies() {
  const number = numberOfMovies();
  const [numberCounter, setNumberCounter] = React.useState(number.initial);

  const changeCounter = () => {
    const numberUpd = numberOfMovies();
    setNumberCounter(numberCounter + numberUpd.add);
  };

  const [cards, setCards] = React.useState([]);
  const [sortedСards, setSortedСards] = React.useState([]);
  const [findMovies, setFindMovies] = React.useState(false);
  const [preloader, setPreloader] = React.useState(false);

  const filterCards = (search) => {
    setFindMovies(true);
    const filter = (FCards) => {
      setSortedСards(
        FCards.filter((card) => {
          const nameMovie = card.nameRU
            .toLowerCase()
            .includes(search.name.toLowerCase());
          const shortFilm = search.shortFilm
            ? card.duration <= 40
            : true;
          return nameMovie && shortFilm;
        }),
      );
    };

    if (cards.length === 0) {
      const localMovies = JSON.parse(
        localStorage.getItem('local-movies') || '[]',
      );
      if (localMovies.length === 0) {
        const token = localStorage.getItem('jwt');
        mainApi.setToken(token);
        setPreloader(true);
        Promise.all([moviesApi.getMovies(), mainApi.getMovies()]).then(
          ([beatCards, localCards]) => {
            const mergeCards = beatCards.map((card) => {
              const localCard = localCards.find(
                (localCardItem) => localCardItem.movieId === card.id,
              );
              card._id = localCard !== undefined ? localCard._id : '';
              card.movieId = card.id;
              card.thumbnail = `https://api.nomoreparties.co${card.image.url}`;
              card.saved = localCard !== undefined;
              return card;
            });
            setCards(mergeCards);
            filter(mergeCards);
            localStorage.setItem('local-movies', JSON.stringify(mergeCards));
            setPreloader(false);
          },
        );
      } else {
        setCards(localMovies);
        filter(localMovies);
      }
    } else {
      filter(cards);
      setNumberCounter(number.initial);
    }
  };

  const saveMovie = (card) => {
    if (card.saved) {
      mainApi.deleteMovie(card._id).then(() => {
        moviesApi.deleteMovie(card.movieId);
        setCards((beatCards) => {
          const mergeDeletedCards = beatCards.map((beatCard) => {
            if (beatCard._id === card._id) {
              beatCard.saved = false;
            }
            return beatCard;
          });
          return mergeDeletedCards;
        });
      });
    } else {
      const createSavedCard = {
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `https://api.nomoreparties.co${card.image.url}`,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      };
      mainApi.createMovie(createSavedCard).then((serverCard) => {
        moviesApi.createMovie(serverCard);
        setCards((beatCards) => {
          const mergeSavedCards = beatCards.map((beatCard) => {
            if (beatCard.id === serverCard.movieId) {
              beatCard.saved = true;
              beatCard._id = serverCard._id;
              beatCard.movieId = serverCard.movieId;
              beatCard.thumbnail = serverCard.thumbnail;
            }
            return beatCard;
          });
          return mergeSavedCards;
        });
      });
    }
  };

  return (
    <main className='main'>
      <SearchForm filterCards={filterCards} page='movies' />
      <MoviesCardList
        cards={sortedСards.filter((_, i) => i < numberCounter)}
        findMovies={findMovies}
        saveMovie={saveMovie}
        preloader={preloader}
        changeCounter={changeCounter}
        sortedСards={sortedСards}
        numberCounter={numberCounter}
      />
    </main>
  );
}

export default Movies;
