import React from 'react';
import './Portfolio.css';
import arrow from '../../../images/arrow.svg';

function Portfolio() {
  return (
    <article className='portfolio'>
      <p className='portfolio__subtitle'>Портфолио</p>
      <ul className='portfolio__links'>
        <li>
          <a
            href='https://github.com/kochetkov1/how-to-learn'
            target='blank'
            className='portfolio__link animation'
          >
            <p className='portfolio__link-text'>Статичный сайт</p>
            <img
              className='portfolio__link-arrow'
              src={arrow}
              alt='Стрелка-указатель'
            />
          </a>
        </li>
        <li>
          <a
            href='https://github.com/kochetkov1/russian-travel'
            target='blank'
            className='portfolio__link animation'
          >
            <p className='portfolio__link-text'>Адаптивный сайт</p>
            <img
              className='portfolio__link-arrow'
              src={arrow}
              alt='Стрелка-указатель'
            />
          </a>
        </li>
        <li>
          <a
            href='https://github.com/kochetkov1/react-mesto-auth'
            target='blank'
            className='portfolio__link animation portfolio__link_no-border'
          >
            <p className='portfolio__link-text '>Одностраничное приложение</p>
            <img
              className='portfolio__link-arrow'
              src={arrow}
              alt='Стрелка-указатель'
            />
          </a>
        </li>
      </ul>
    </article>
  );
}

export default Portfolio;
