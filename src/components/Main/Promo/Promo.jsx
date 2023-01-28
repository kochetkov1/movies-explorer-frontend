import React from 'react';
import './Promo.css';

function Promo() {
  return (
    <article className='promo'>
      <section className='promo__container'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <div className='promo__links'>
          <a href='#project' className='promo__link animation'>
            О проекте
          </a>
          <a href='#techs' className='promo__link animation'>
            Технологии
          </a>
          <a href='#student' className='promo__link animation'>
            Студент
          </a>
        </div>
      </section>
    </article>
  );
}

export default Promo;
