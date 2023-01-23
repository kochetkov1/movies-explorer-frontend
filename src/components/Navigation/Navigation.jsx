import React from 'react';
import cn from 'classnames';
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation(props) {
  const {
    isOpen,
    isMenuOpen,
    isMain, isMovies,
    isSavedMovies,
    isProfile,
  } = props;

  const navigationClassName = cn(
    'navigation',
    isMenuOpen ? 'navigation_opened' : null,
  );

  const mainClassName = cn(
    'navigation__link navigation__link_movies navigation__link_mobile animation',
    isMain ? 'navigation__link_active' : null,
  );

  const moviesClassName = cn(
    'navigation__link navigation__link_movies navigation__link_mobile animation',
    isMovies ? 'navigation__link_active' : null,
  );

  const savedMoviesClassName = cn(
    'navigation__link navigation__link_movies navigation__link_mobile animation',
    isSavedMovies ? 'navigation__link_active' : null,
  );
  const profileClassName = cn(
    'navigation__link navigation__link_movies navigation__link_profile animation',
    isProfile ? 'navigation__link_active' : null,
  );

  return (
    <div className={navigationClassName}>
      <div className='navigation__container_mobile'>
        <button
          className='navigation__menu-button navigation__menu-button_close_mobile animation'
          onClick={isOpen}
        ></button>
        <Link
          to='/'
          className={mainClassName}
          aria-label='Главная'
          onClick={isOpen}
        >
          Главная
        </Link>
        <Link
          to='/movies'
          className={moviesClassName}
          aria-label='Фильмы'
          onClick={isOpen}
        >
          Фильмы
        </Link>
        <Link
          to='/saved-movies'
          className={savedMoviesClassName}
          aria-label='Сохранённые фильмы'
          onClick={isOpen}
        >
          Сохранённые фильмы
        </Link>
        <Link
          to='/profile'
          className={profileClassName}
          aria-label='Аккаунт'
          onClick={isOpen}
        >
          Аккаунт <div className='navigation__profile-icon'></div>
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
