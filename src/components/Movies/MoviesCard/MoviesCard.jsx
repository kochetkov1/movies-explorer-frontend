import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

function MoviesCard({ card, saveMovie }) {
  const location = useLocation();
  // Перевод минут в часы и минуты
  const durationHours = card.duration >= 60 ? `${Math.floor(card.duration / 60)} ч ` : '';
  const durationMinutes = card.duration === 60 ? '' : `${card.duration % 60} м`;
  const totalDuration = durationHours + durationMinutes;

  // Выбор класснейма кнопки
  const nameButton = !card.saved ? 'Сохранить' : '';
  let classNames = 'card__save-button animation';
  if (card.saved) {
    classNames += ' card__save-button_saved animation';
  }

  const handleSaveMovie = () => saveMovie(card);

  return (
    <li className='card'>
      <div className='card__container'>
        <a
          className='animation'
          href={card.trailerLink}
          target='_blank'
          rel='noreferrer'
        >
          <img className='card__image' src={card.thumbnail} alt={card.nameRU} />
        </a>
        {location.pathname === '/movies' && (
          <button className={classNames} onClick={handleSaveMovie}>
            {nameButton}
          </button>
        )}
        {location.pathname === '/movies' && card.saved && (
          <button className={classNames}></button>
        )}
        {location.pathname === '/saved-movies' && (
          <button
            className='card__save-button card__save-button_deleted animation'
            onClick={handleSaveMovie}
          ></button>
        )}
        <div className='card__info'>
          <p className='card__name'>{card.nameRU}</p>
          <p className='card__duration'>{totalDuration}</p>
        </div>
      </div>
    </li>
  );
}

export default MoviesCard;
