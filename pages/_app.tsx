import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux';
import {store} from '../store/store';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';

export default function App({Component, pageProps}: AppProps) {
  return <Provider store={store}>
    <NextNProgress/>
    <Component {...pageProps} />
  </Provider>
}
