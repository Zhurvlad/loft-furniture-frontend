import React from 'react';
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux';
import NextNProgress from 'nextjs-progressbar';

import {store} from '../store/store';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import '@/styles/globals.css'


export default function App({Component, pageProps}: AppProps) {

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  })

  return mounted &&<Provider store={store}>
     <>
    <NextNProgress/>
    <Component {...pageProps}/>
     <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        limit={1}
        theme="light"
      />
  </>
  </Provider>
}
