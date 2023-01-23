import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import Footer from '../Footer/Footer.jsx';
import Profile from '../Profile/Profile.jsx';
import Register from '../Register/Register.jsx';
import Login from '../Login/Login.jsx';
import Movies from '../Movies/Movies.jsx';
import SavedMovies from '../Movies/SavedMovies/SavedMovies.jsx';
import NotFound from '../NotFound/NotFound.jsx';
import Navigation from '../Navigation/Navigation.jsx';

function App() {
  // Выбор состояния для смены наполнения header (для этапа верстки)
  const isAuthorized = true;
  // const isAuthorized = false;

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  function handleMenuOpenClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <Header
              isOpen={handleMenuOpenClick}
              isSignupOrSignin={false}
              isAuthorized={isAuthorized}
            ></Header>
            <Main></Main>
            <Footer></Footer>
            <Navigation
              isOpen={handleMenuOpenClick}
              isMenuOpen={isMenuOpen}
              isMain={true}
            ></Navigation>
          </>
        }
      />

      <Route
        path='/movies'
        element={
          <>
            <Header
              isOpen={handleMenuOpenClick}
              isSignupOrSignin={false}
              isAuthorized={isAuthorized}
            />
            <Movies />
            <Footer />
            <Navigation
              isOpen={handleMenuOpenClick}
              isMenuOpen={isMenuOpen}
              isMovies={true}
            />
          </>
        }
      />

      <Route
        path='/saved-movies'
        element={
          <>
            <Header
              isOpen={handleMenuOpenClick}
              isSignupOrSignin={false}
              isAuthorized={isAuthorized}
            />
            <SavedMovies />
            <Footer />
            <Navigation
              isOpen={handleMenuOpenClick}
              isMenuOpen={isMenuOpen}
              isSavedMovies={true}
            />
          </>
        }
      />

      <Route
        path='/signup'
        element={
          <>
            <Header isSignupOrSignin={true} />
            <Register />
          </>
        }
      />

      <Route
        path='/signin'
        element={
          <>
            <Header isSignupOrSignin={true} />
            <Login />
          </>
        }
      />

      <Route
        path='/profile'
        element={
          <>
            <Header
              isOpen={handleMenuOpenClick}
              isSignupOrSignin={false}
              isAuthorized={isAuthorized}
            />
            <Profile />
            <Navigation
              isOpen={handleMenuOpenClick}
              isMenuOpen={isMenuOpen}
              isProfile={true}
            />
          </>
        }
      />

      {/* Временное решение для этапа верстки */}
      <Route path='/404' element={<NotFound />} />
    </Routes>
  );
}

export default App;
