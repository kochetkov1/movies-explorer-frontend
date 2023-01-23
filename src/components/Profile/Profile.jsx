import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <main className='profile'>
      <form className='profile__form' action='/'>
        <h1 className='profile__title'>Привет, Василий!</h1>
        <fieldset className='profile__input-field'>
          <label className='profile__block profile__block_name' htmlFor='name'>
            <span className='profile__point'>Имя</span>
            <input
              className='profile__input'
              type='text'
              name='name'
              defaultValue='Василий'
            />
          </label>
          <label className='profile__block' htmlFor='email'>
            <span className='profile__point'>E-mail</span>
            <input
              className='profile__input'
              type='email'
              name='email'
              defaultValue='pochta@yandex.ru'
            />
          </label>
        </fieldset>
        <fieldset className='profile__button-field'>
          <button className='profile__button animation' type='submit'>
            Редактировать
          </button>
          <button
            className='profile__button profile__button_logout animation'
            type='button'
          >
            Выйти из аккаунта
          </button>
        </fieldset>
      </form>
    </main>
  );
}

export default Profile;
