import './App.css';
import React, { useState, useEffect } from 'react';
import Router from './router/Router';
import useLocalStorage from './hooks/useLocalStorage';
import MLBApi from './api/api';
import UserContext from './auth/UserContext';
import LoadingSpinner from './common/LoadingSpinner';
import { decodeToken } from 'react-jwt';
import NavBar from './common/NavBar';

/** MLB application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage('MLB_TOKEN');

  console.debug(
    'App',
    'infoLoaded=',
    infoLoaded,
    'currentUser=',
    currentUser,
    'token=',
    token
  );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(
    function loadUserInfo() {
      console.debug('App useEffect loadUserInfo', 'token=', token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = decodeToken(token);
            // put the token on the Api class so it can use it to call the API.
            MLBApi.token = token;
            let currentUser = await MLBApi.getCurrentUser(username);
            setCurrentUser(currentUser);
          } catch (err) {
            console.error('App loadUserInfo: problem loading', err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }

      // set infoLoaded to false while async getCurrentUser runs; once the
      // data is fetched (or even if an error happens!), this will be set back
      // to false to control the spinner.
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  function redirect() {
    window.location.href = 'http://localhost:3000/';
  }
  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
    redirect();
  }

  /** Handles site-wide delete user. */
  async function deleteUser() {
    try {
      await MLBApi.deleteUser(currentUser.username);
      logout();
    } catch (err) {
      console.error('App deleteUser: problem deleting', err);
    }
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
  async function register(signupData) {
    try {
      let token = await MLBApi.register(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('signup failed', errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await MLBApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('login failed', errors);
      return { success: false, errors };
    }
  }

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        <NavBar logout={logout} deleteUser={deleteUser} />
        <Router login={login} register={register} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
