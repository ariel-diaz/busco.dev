import React, { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../utils/api';

const UserContext = React.createContext({});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = async newProfile => {
    try {
      const { data: { payload } } = await axios.put(`${api.user}`, { ...newProfile });
      initUser(payload);
    } catch (e) {
      console.log('e', e);
    }
  };


  const signUp = async(userData) => {
    try {
      const { data, status } = await axios.post(`${api.auth}/signUp`, {
        ...userData
      });

      if(!data) { throw new Error()}
      const { token , payload } = data;

      initUser(payload);
      return status;
    } catch (error) { 
      throw new Error('No se puede crear la cuenta.')
    }
  }


  const initUser = (userData) => {
    setUser(userData);
    window.localStorage.setItem('user', JSON.stringify(userData));
  }

  const signIn = async (email, password) => {
    const { data, status } = await axios.post(`${api.auth}/signIn`, {
      email,
      password,
    });
    initUser(data.payload);
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
    <UserContext.Provider value={{ user, updateUser, signIn, signOut, signUp }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);

export default UserProvider;
