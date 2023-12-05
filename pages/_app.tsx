import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from 'react-redux';
import {store} from '../store/store';
import NextNProgress from 'nextjs-progressbar';
import React, {useRef} from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {Api} from '../utils/api/index';
import {userSlice} from '../store/reducers/UserSlice';
import {shoppingCartApi} from '../store/shoppingCart/shoppingCart.api';

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
