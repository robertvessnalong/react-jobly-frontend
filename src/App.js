import { BrowserRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import JoblyApi from './api';
import UserContext from './UserContext';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [user, setCurrentUser] = useState({});

  const login = async (data) => {
    const res = await JoblyApi.login(data);
    if (res.error) {
      return res;
    }
    setToken(res.token);
    localStorage.setItem(
      'jobly-token',
      JSON.stringify({
        token: res.token,
        username: res.username,
      })
    );
    return { login: 'success' };
  };

  const signUp = async (data) => {
    const res = await JoblyApi.register(data);
    if (res.error) {
      return res;
    }
    setToken(res.token);
    localStorage.setItem(
      'jobly-token',
      JSON.stringify({
        token: res.token,
        username: res.username,
      })
    );
    return { login: 'success' };
  };

  const logOut = async () => {
    setToken('');
    setCurrentUser('');
    localStorage.removeItem('jobly-token');
  };

  useEffect(() => {
    const getUserInfo = async (storage) => {
      const { username, token } = storage;
      const res =
        token === null
          ? await JoblyApi.getUserInfo(username)
          : await JoblyApi.getUserInfo(username, token);
      setCurrentUser(() => ({ ...res.user }));
      setToken(token);
    };

    if (localStorage.getItem('jobly-token')) {
      getUserInfo(JSON.parse(localStorage.getItem('jobly-token')));
    }
  }, [token, user.username]);

  return (
    <div className='App'>
      <BrowserRouter>
        <UserContext.Provider value={{ login, signUp, user, logOut }}>
          <Routes />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;

// Password for Test Site
// usr: testtwo
// pass: testpass

// Password for Robert
// usr: robert
// pass: password
