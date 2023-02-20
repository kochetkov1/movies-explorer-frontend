import React from 'react';
import './Register.css';

function Register({ handleRegister }) {
  const [value, setValue] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = React.useState({
    name: '',
    email: '',
    password: '',
  });
  const [isValidForm, setIsValidForm] = React.useState(false);
  const [apiError, setApiError] = React.useState('');

  function handleChange(e) {
    setValue((currentValue) => ({
      ...currentValue,
      [e.target.name]: e.target.value,
    }));
    setError((currentValue) => ({
      ...currentValue,
      [e.target.name]: e.target.validationMessage,
    }));
    setIsValidForm(e.target.closest('form').checkValidity());
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(value.name, value.email, value.password, setApiError);
  }

  return (
    <main className='register'>
      <form className='register__form' action='/' onSubmit={handleSubmit}>
        <h1 className='register__title'>Добро пожаловать!</h1>
        <fieldset className='register__input-field'>
          <label className='register__label' htmlFor='name'>
            <span className='register__point'>Имя</span>
            <input
              className='register__input'
              type='text'
              name='name'
              id='name'
              placeholder='Имя'
              value={value.name}
              onChange={handleChange}
              required
              minLength={2}
            />
            <span className='register__error register__error_active'>{error.name}</span>
          </label>
          <label className='register__label' htmlFor='email'>
            <span className='register__point'>E-mail</span>
            <input
              className='register__input'
              type='email'
              name='email'
              id='email'
              placeholder='E-mail'
              value={value.email}
              onChange={handleChange}
              required
              pattern='.+@.+\..+'
            />
            <span className='register__error register__error_active'>{error.email}</span>
          </label>
          <label className='register__label' htmlFor='password'>
            <span className='register__point'>Пароль</span>
            <input
              className='register__input'
              type='password'
              name='password'
              id='password'
              placeholder='Пароль'
              value={value.password}
              onChange={handleChange}
              required
              minLength={5}
            />
            <span className='register__error register__error_active'>{error.password}</span>
          </label>
          <span className='register__error register__error_active'>{apiError}</span>
        </fieldset>
        <fieldset className='register__button-field register__button-field-login'>
          <button
            type='submit'
            className='register__button animation'
            disabled={!isValidForm}
          >
            Зарегистрироваться
          </button>
          <div className='register__container'>
            <p className='register__question'>Уже зарегистрированы?</p>
            <a className='register__link animation' href='/signin'>
              Войти
            </a>
          </div>
        </fieldset>
      </form>
    </main>
  );
}

export default Register;
