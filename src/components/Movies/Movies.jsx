import React from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm.jsx';
import MoviesCardList from './MoviesCardList/MoviesCardList.jsx';

function Movies() {
  return (
    <main className='main'>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
