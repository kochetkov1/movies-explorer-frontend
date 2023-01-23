import React from 'react';
import './NotFound.css';

function NotFound() {
  return (
    <main className='not-found'>
      <h1 className='not-found__title'>404</h1>
      <p className='not-found__text'>Страница не найдена</p>
      <a className='not-found__link animation' href='/'>
        Назад
      </a>
    </main>
  );
}

export default NotFound;
