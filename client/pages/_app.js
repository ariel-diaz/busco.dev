import App from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import UserProvider from '../contexts/user';
import Navbar from '../components/Navbar';

const theme = {
  colors: {
    orange: '#FF4F00',
  },
};

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <UserProvider>
          <Navbar />
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    );
  }
}
