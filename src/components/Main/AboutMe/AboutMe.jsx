import React from 'react';
import './AboutMe.css';
import photo from '../../../images/photo.jpg';

function AboutMe() {
  return (
    <article className='about-me' id='student'>
      <h2 className='about-me__title-main'>Пилот</h2>
      <section className='about-me__student'>
        <div className='about-me__description-container'>
          <h3 className='about-me__title'>Айртон Сенна</h3>
          <p className='about-me__subtitle'>
            Трёхкратный чемпион мира в классе «Формула-1»
          </p>
          <p className='about-me__paragraph'>
            Считается, что в Формуле-1 гонки в дождевых условиях выравнивают
            шансы участников - скорости сильно уменьшаются, и преимущество более
            мощного мотора или лучшей аэродинамики нивелируется. Однако Айртон
            Сенна именно в этих условиях не раз демонстрировал большое
            преимущество над другими гонщиками. За многочисленные примеры
            высоких достижений в дождевых гонках спортивные журналисты и
            болельщики дали Сенне прозвище «Человек дождя».
          </p>
          <a
            href='https://github.com/kochetkov1'
            target='blank'
            className='about-me__link'
          >
            Github
          </a>
        </div>
        <img src={photo} alt='Фотография автора' className='about-me__photo' />
      </section>
    </article>
  );
}

export default AboutMe;
