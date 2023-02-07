import React from 'react';
import './App.css';
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
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
import mainApi from '../../utils/MainApi.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [authorized, setAuthorized] = React.useState(true);
  const [isAuth, setIsAuth] = React.useState(false);
  const navigate = useNavigate();

  function handleMenuOpenClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    setAuthorized(false);
    setIsAuth(false);
    navigate('/');
    mainApi.setToken('');
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    mainApi.setToken(jwt);
    console.log('jwt', jwt);
    if (jwt) {
      mainApi
        .getCurrentUser()
        .then((user) => {
          setAuthorized(true);
          setIsAuth(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          setAuthorized(false);
          handleLogout();
          console.log('Ошибка: ', err);
        });
    } else {
      setAuthorized(false);
    }
  };

  React.useEffect(() => {
    tokenCheck();
    console.log(authorized);
  }, [authorized]);

  const handleLogin = (email, password, setApiError) => {
    mainApi
      .login({ email, password })
      .then((data) => {
        mainApi.setToken(data.token);
        localStorage.setItem('jwt', data.token);
        setAuthorized(true);
        setApiError('');
        mainApi
          .getCurrentUser()
          .then((res) => {
            setCurrentUser({ name: res.name, email: res.email });
            navigate('/movies');
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        setApiError(err.message);
      });
  };

  const handleRegister = (name, email, password, setApiError) => {
    mainApi
      .createUser({ name, email, password })
      .then(() => {
        handleLogin(email, password, setApiError);
        setApiError('');
      })
      .catch((err) => {
        setApiError(err.message);
      });
  };

  function handleUpdateUser(name, email, setApiError) {
    const token = localStorage.getItem('jwt') || '';
    mainApi.setToken(token);
    mainApi
      .updateUser({ name, email })
      .then(() => {
        setCurrentUser({ name, email });
        setApiError('');
      })
      .catch((err) => {
        setApiError(err.message);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header
                isOpen={handleMenuOpenClick}
                isSignupOrSignin={false}
                isAuthorized={authorized}
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
            <ProtectedRoute isAuthorized={authorized}>
              <>
                <Header
                  isOpen={handleMenuOpenClick}
                  isSignupOrSignin={false}
                  isAuthorized={authorized}
                />
                <Movies />
                <Footer />
                <Navigation
                  isOpen={handleMenuOpenClick}
                  isMenuOpen={isMenuOpen}
                  isMovies={true}
                />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path='/saved-movies'
          element={
            <ProtectedRoute isAuthorized={authorized}>
              <>
                <Header
                  isOpen={handleMenuOpenClick}
                  isSignupOrSignin={false}
                  isAuthorized={authorized}
                />
                <SavedMovies />
                <Footer />
                <Navigation
                  isOpen={handleMenuOpenClick}
                  isMenuOpen={isMenuOpen}
                  isSavedMovies={true}
                />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path='/signup'
          element={
            <>
              {!isAuth ? (
                <>
                  <Header isSignupOrSignin={true} />
                  <Register handleRegister={handleRegister} />
                </>
              ) : (
                <Navigate to='/movies' />
              )}
            </>
          }
        />

        <Route
          path='/signin'
          element={
            <>
              {!isAuth ? (
                <>
                  <Header isSignupOrSignin={true} />
                  <Login handleLogin={handleLogin} />
                </>
              ) : (
                <Navigate to='/movies' />
              )}
            </>
          }
        />

        <Route
          path='/profile'
          element={
            <ProtectedRoute isAuthorized={authorized}>
              <>
                <Header
                  isOpen={handleMenuOpenClick}
                  isSignupOrSignin={false}
                  isAuthorized={authorized}
                />
                <Profile
                  authorized={authorized}
                  onUpdateUser={handleUpdateUser}
                  handleLogout={handleLogout}
                />
                <Navigation
                  isOpen={handleMenuOpenClick}
                  isMenuOpen={isMenuOpen}
                  isProfile={true}
                />
              </>
            </ProtectedRoute>
          }
        />

        <Route path='*' element={<NotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
