import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__text'>
        Учебный проект kochetkov1 x Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__container'>
        <p className='footer__copyright'>&copy; 2023</p>
        <ul className='footer__links'>
          <li className='footer__link-box'>
            <a
              href='https://practicum.yandex.ru/'
              target='blank'
              className='footer__link animation'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__link-box'>
            <a
              href='https://github.com/kochetkov1'
              target='blank'
              className='footer__link animation'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
