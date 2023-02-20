import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Profile({ onUpdateUser, handleLogout }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [value, setValue] = React.useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const [error, setError] = React.useState({ name: '', email: '' });
  const [isValidForm, setIsValidForm] = React.useState(false);
  const [apiError, setApiError] = React.useState(null);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [isSubmit, setIsSubmit] = React.useState(false);

  const hasError = apiError || error.email || error.name;

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
    setIsSubmit(false);
  }

  React.useEffect(() => {
    setIsDisabled(
      currentUser.name === value.name && currentUser.email === value.email,
    );
  }, [value.name, value.email, currentUser.name, currentUser.email]);

  React.useEffect(() => {
    setValue({ name: currentUser.name, email: currentUser.email });
  }, [currentUser.name, currentUser.email]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(value.name, value.email, setApiError);
    setIsSubmit(true);
  }

  return (
    <main className='profile'>
      <form className='profile__form' action='/' onSubmit={handleSubmit}>
        <h1 className='profile__title'>Привет, {value.name}!</h1>
        <fieldset className='profile__input-field'>
          <label className='profile__block profile__block_name' htmlFor='name'>
            <span className='profile__point'>Имя</span>
            <input
              className='profile__input'
              type='text'
              name='name'
              id='name'
              placeholder='Имя'
              value={value.name}
              onChange={handleChange}
              required
              minLength={2}
            />
          </label>
          <label className='profile__block' htmlFor='email'>
            <span className='profile__point'>E-mail</span>
            <input
              className='profile__input'
              type='email'
              name='email'
              id='email'
              placeholder='E-mail'
              value={value.email}
              onChange={handleChange}
              required
              pattern='.+@.+\..+'
            />
          </label>
          <span
          className={
            hasError ? 'profile__message-error profile__message' : 'profile__message'
          }
        >
          {!isSubmit && !hasError
            ? ''
            : hasError || 'Данные успешно обновлены'}
        </span>
        </fieldset>
        <fieldset className='profile__button-field'>
          <button
            className='profile__button animation'
            type='submit'
            disabled={!isValidForm || isDisabled}
          >
            Редактировать
          </button>
          <button
            className='profile__button profile__button_logout animation'
            type='button'
            onClick={handleLogout}
          >
            Выйти из аккаунта
          </button>
        </fieldset>
      </form>
    </main>
  );
}

export default Profile;
