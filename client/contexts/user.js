import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../utils/api';

const UserContext = React.createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = async newProfile => {
    try {
      const res = await axios.put(`${api.user}`, { ...newProfile });
      console.log('NUEVO USER', res);
    } catch (e) {
      console.log('e', e);
    }
  };

  const signIn = async (email, password) => {
    const { data, status } = await axios.post(`${api.auth}/signIn`, {
      email,
      password,
    });

    setUser(data.payload);
    window.localStorage.setItem('user', JSON.stringify(data.payload));
    return status;
  };

  const signOut = () => {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
  };

  useEffect(() => {
    const userLocalStorage =
      (window.localStorage.getItem('user') &&
        JSON.parse(window.localStorage.getItem('user'))) ||
      null;
    if (userLocalStorage && !user) {
      console.log('ASDSAD', userLocalStorage);
      setUser(userLocalStorage);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);

export default UserProvider;
