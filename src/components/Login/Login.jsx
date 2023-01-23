import React from 'react';
import '../Register/Register.css';
import './Login.css';

function Login() {
  return (
    <main className='register'>
      <form className='register__form' action='/'>
        <h1 className='register__title'>Рады видеть!</h1>
        <fieldset className='register__input-field'>
          <label className='register__label' htmlFor='email'>
            <span className='register__point'>E-mail</span>
            <input
              className='register__input'
              type='email'
              name='email'
              defaultValue='ya@ya.ru'
            />
            <span className='register__error'>Что-то пошло не так...</span>
          </label>
          <label className='register__label' htmlFor='password'>
            <span className='register__point'>Пароль</span>
            <input
              className='register__input register__input_error'
              type='password'
              name='password'
              defaultValue='12345'
            />
            <span className='register__error register__error_active'>
              Что-то пошло не так...
            </span>
          </label>
        </fieldset>
        <fieldset className='register__button-field login__button-field'>
          <button className='register__button animation'>Войти</button>
          <div className='register__container'>
            <p className='register__question'>Ещё не зарегистрированы?</p>
            <a className='register__link animation' href='/signup'>Регистрация</a>
          </div>
        </fieldset>
      </form>
    </main>
  );
}

export default Login;
