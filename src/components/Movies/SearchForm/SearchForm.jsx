import React from 'react';
import './SearchForm.css';
import loupe from '../../../images/loupe.svg';

function SearchForm({ filterCards, page, required = true }) {
  const formRef = React.useRef(null);
  const [error, setError] = React.useState({
    name: '',
    shortFilm: '',
  });
  const [value, setValue] = React.useState({
    name: '',
    shortFilm: false,
  });
  const [isDisabled, setIsDisabled] = React.useState(true);

  React.useEffect(() => {
    const searchMovies = JSON.parse(localStorage.getItem('search-movies'));
    if (searchMovies) {
      setValue(searchMovies);
      filterCards(searchMovies);
    }
    if (page === 'saved-movies') {
      filterCards(value);
      setValue({ name: '', shortFilm: false });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value: inputValue, validationMessage } = e.target;
    const newValue = { ...value, [name]: inputValue };
    if (page === 'movies') {
      localStorage.setItem('search-movies', JSON.stringify(newValue));
    }
    setValue(newValue);
    setError((state) => ({ ...state, [name]: validationMessage }));
    setIsDisabled(!formRef.current.checkValidity());
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    const newValue = { ...value, [name]: checked };
    localStorage.setItem('search-movies', JSON.stringify(newValue));
    setValue(newValue);
    filterCards(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    filterCards(value);
  };

  return (
    <article className='search'>
      <form
        ref={formRef}
        className='search__form'
        onSubmit={handleSubmit}
        noValidate
      >
        <fieldset className='search__main-group'>
          <img className='search__image' src={loupe} alt='Лупа' />
          <input
            className='search__input'
            name='name'
            type='text'
            placeholder='Введите название'
            required={required}
            onChange={handleChange}
            value={value.name}
          />
          <button
            className='search__button animation'
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            Найти
          </button>
          <span className='search__message'>{error.name}</span>
        </fieldset>
        <fieldset className='search__switch-group'>
          <div className='search__switch'>
            <input
              className='search__checkbox'
              type='checkbox'
              id='shortfilm'
              onChange={handleCheckbox}
              name='shortFilm'
              checked={value.shortFilm}
            />
            <label className='search__label'>Короткометражки</label>
          </div>
        </fieldset>
      </form>
      <hr className='search__line' />
    </article>
  );
}

export default SearchForm;
