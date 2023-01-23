import React from 'react';
import './MoviesCard.css';

function MoviesCard({
  saveStatus, deleteStatus, image, cardName,
}) {
  const saved = saveStatus;
  const deleted = deleteStatus;
  const nameButton = saved || deleted ? '' : 'Сохранить';
  let classNames = 'card__save-button animation';
  if (saved) {
    classNames += ' card__save-button_saved animation';
  }
  if (deleted) {
    classNames += ' card__save-button_deleted animation';
  }
  return (
    <li className='card'>
      <div className='card__container'>
        <img className='card__image' src={image} alt='Обложка' />
        <button className={classNames}>{nameButton}</button>
        <div className='card__info'>
          <a className='card__name animation' href=''>
            {cardName}
          </a>
          <p className='card__duration'>1ч 17м</p>
        </div>
      </div>
    </li>
  );
}

export default MoviesCard;
