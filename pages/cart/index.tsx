import Head from 'next/head'
import React from 'react';

import {CartPage} from '../../components/templates/CartPage/index';
import {MainLayout} from '../../components/layout/MainLayout';
import {Breadcrumbs} from '../../components/modules/Breadcrumbs/Breadcrumbs';

export default function Cart() {

  const getDefaultTextGenerator = React.useCallback(() => 'Корзина', [])
  const getTextGenerator = React.useCallback((param: string) => ({}[param]), []);

  return (
    <>
      <Head>
        <title>Loft Мебель</title>
        <meta charSet='UTF-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE-edge'/>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel={'icon'} type={'image/svg'} size={'32x32'} href={'/img/LogoSmall.svg'}/>
      </Head>
      <MainLayout>
        <main>
          <Breadcrumbs
            getDefaultTextGenerator={getDefaultTextGenerator}
            getTextGenerator={getTextGenerator}
          />
          <CartPage/>
        </main>
      </MainLayout>
    </>
  )
}


