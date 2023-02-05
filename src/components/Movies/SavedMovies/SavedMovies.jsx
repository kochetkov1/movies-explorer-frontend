import React from 'react';
import '../Movies.css';
import SearchForm from '../SearchForm/SearchForm.jsx';
import MoviesCardList from '../MoviesCardList/MoviesCardList.jsx';
import moviesApi from '../../../utils/MoviesApi.js';
import mainApi from '../../../utils/MainApi.js';
import { numberOfMovies } from '../../../utils/Utils.js';

function SavedMovies() {
  const number = numberOfMovies();
  const [numberCounter, setNumberCounter] = React.useState(number.initial);

  const changeCounter = () => {
    const numberUpd = numberOfMovies();
    setNumberCounter(numberCounter + numberUpd.add);
  };

  const [cards, setCards] = React.useState([]);
  const [sortedСards, setSortedСards] = React.useState([]);

  const filterCards = (search) => {
    setSortedСards(
      cards.filter((card) => {
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

  React.useEffect(() => {
    mainApi.getMovies().then((serverCards) => {
      setCards(serverCards);
      setSortedСards(serverCards);
    });
  }, []);

  const saveMovie = (card) => {
    mainApi.deleteMovie(card._id).then(() => {
      moviesApi.deleteMovie(card.movieId);
      setSortedСards((savedCards) => {
        const filteredSavedCards = savedCards.filter(
          (savedCard) => savedCard._id !== card._id,
        );
        return filteredSavedCards;
      });
    });
  };

  return (
    <main className='main'>
      <SearchForm
        filterCards={filterCards}
        page='saved-movies'
        required={false}
      />
      <MoviesCardList
        cards={sortedСards.filter((_, i) => i < numberCounter)}
        saveMovie={saveMovie}
        changeCounter={changeCounter}
        sortedСards={sortedСards}
        numberCounter={numberCounter}
      />
    </main>
  );
}

export default SavedMovies;
