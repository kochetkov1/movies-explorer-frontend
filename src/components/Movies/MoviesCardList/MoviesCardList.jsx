import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import Preloader from '../Preloader/Preloader.jsx';

function MoviesCardList({
  cards,
  findMovies,
  saveMovie,
  preloader,
  changeCounter,
  sortedСards,
  numberCounter,
}) {
  return (
    <article className='card-list'>
      {preloader ? (
        <Preloader />
      ) : (
        <>
          <ul className='card-list__items'>
            {cards.map((card) => (
              <MoviesCard
                key={card.movieId}
                card={card}
                saveMovie={saveMovie}
              />
            ))}
            {cards.length === 0 && findMovies && !preloader && (
              <li className='card-list__message-container'>
                <span className='card-list__message'>Ничего не нашлось</span>
              </li>
            )}
          </ul>
          {sortedСards.length > numberCounter && !preloader && (
            <button
              className='card-list__button animation'
              onClick={changeCounter}
            >
              Ещё
            </button>
          )}
        </>
      )}
    </article>
  );
}

export default MoviesCardList;
