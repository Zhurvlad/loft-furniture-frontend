import Head from 'next/head'
import React from 'react';
import {CatalogPage} from '../../components/templates/CatalogPage/index';
import {Header} from '../../components/modules/Header/Header';
import {Footer} from '../../components/modules/Footer/Footer';

export default function Home() {



  /*  const {data, error, isLoading} = useGetSofasQuery()*/



  /* React.useEffect(() => {
     fetchSofas(dispatch)
   }, [])*/

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
      <Header/>
      <CatalogPage/>
      <Footer/>
    </>
  )
}
