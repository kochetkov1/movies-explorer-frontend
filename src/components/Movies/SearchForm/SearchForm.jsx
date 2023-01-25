import React from 'react';
import './SearchForm.css';
import loupe from '../../../images/loupe.svg';

function SearchForm() {
  return (
    <article className='search'>
      <form className='search__form'>
        <fieldset className='search__main-group'>
          <img className='search__image' src={loupe} alt='Лупа' />
          <input
            className='search__input'
            type='text'
            placeholder='Фильм'
            required
          />
          <button className='search__button animation' type='button'>
            Найти
          </button>
        </fieldset>
        <fieldset className='search__switch-group'>
          <div className='search__switch'>
            <input className='search__checkbox' type='checkbox' />
            <label className='search__label'>Короткометражки</label>
          </div>
        </fieldset>
      </form>
      <hr className='search__line' />
    </article>
  );
}

export default SearchForm;
