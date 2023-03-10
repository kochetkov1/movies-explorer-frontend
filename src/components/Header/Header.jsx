import React from 'react';
import './Header.css';
import '../Navigation/Navigation.css';
import { Link } from 'react-router-dom';
import cn from 'classnames';

function Header(props) {
  const { isOpen, isSignupOrSignin, isAuthorized } = props;

  const headerClassName = cn(
    isSignupOrSignin ? 'header_register' : 'header_main',
    'header',
    'navigation',
  );

  return (
    <header className={headerClassName}>
      <Link
        to='/'
        className='header__logo animation'
        aria-label='Главная страница'
      />
      {isAuthorized ? (
        <>
          <div className='header__container navigation__container'>
            <Link
              to='/movies'
              className='header__link-main navigation__link navigation__link_movies animation'
              aria-label='Фильмы'
            >
              Фильмы
            </Link>
            <Link
              to='/saved-movies'
              className='header__link-main navigation__link navigation__link_movies navigation__link_non-bold animation'
              aria-label='Сохранённые фильмы'
            >
              Сохранённые фильмы
            </Link>
            <Link
              to='/profile'
              className='header__link-main navigation__link navigation__link_movies navigation__link_profile-main animation'
              aria-label='Аккаунт'
            >
              Аккаунт <div className='header__profile-icon'></div>
            </Link>
          </div>
          <button
            className='header__menu-button navigation__menu-button animation'
            onClick={isOpen}
          ></button>
        </>
      ) : (
        <div className='header__container'>
          {!isSignupOrSignin ? (
            <>
              <a href='/signup' className='header__link animation'>
                Регистрация
              </a>
              <a
                href='/signin'
                className='header__link header__link_signin animation'
              >
                Войти
              </a>
            </>
          ) : null}
        </div>
      )}
    </header>
  );
}

export default Header;
