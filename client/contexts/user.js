import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useRouter } from 'next/router';
import api from '../utils/api';
import LocalStorageService from '../utils/localStorageService';

const UserContext = React.createContext({});
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const updateUser = async newProfile => {
    try {
      const {
        data: { payload },
      } = await axios.put(`${api.user}`, { ...newProfile });
      initUser(payload);
    } catch (e) {
      console.log('e', e);
    }
  };

  const signUp = async userData => {
    try {
      const { data, status } = await axios.post(`${api.auth}/signUp`, {
        ...userData,
      });

      if (!data) {
        throw new Error();
      }

      const { token, refreshToken, payload } = data;
      initUser(payload, {
        access_token: token,
        refresh_token: refreshToken
      });
      return status;
    } catch (error) {
      throw new Error('No se puede crear la cuenta.');
    }
  };

  const initUser = (userData, token) => {
    const localStorageService = LocalStorageService.getService();
    setUser(userData);
    window.localStorage.setItem('user', JSON.stringify(userData));

    if(token){
      localStorageService.setToken(token)
    }

  };

  const signIn = async (email, password) => {
    const { data, status, } = await axios.post(`${api.auth}/signIn`, {
      email,
      password,
    });

    initUser(data.payload, {
      access_token: data.token,
      refresh_token: data.refreshToken,
    });
    return status;
  };

  const signOut = () => {
    const localStorageService = LocalStorageService.getService();
    window.localStorage.removeItem('user');
    localStorageService.clearToken();

    setUser(null);
    router.push('/login');
  };

  // useEffect(() => {
  //   const userLocalStorage =
  //     (window.localStorage.getItem('user') &&
  //       JSON.parse(window.localStorage.getItem('user'))) ||
  //     null;
  //   if (userLocalStorage && !user) {
  //     setUser(userLocalStorage);
  //   }
  // }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, signIn, signOut, signUp }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);

export default UserProvider;
