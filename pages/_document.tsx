import { Html, Head, Main, NextScript } from 'next/document'
import {Header} from '../components/modules/Header/Header';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import React, {useRef} from 'react';
import {Api} from '../utils/api/index';
import {userSlice} from '../store/reducers/UserSlice';
import {shoppingCartApi} from '../store/shoppingCart/shoppingCart.api';

export default function Document() {



  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;900&family=Roboto:wght@400;500&display=swap"
          rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
