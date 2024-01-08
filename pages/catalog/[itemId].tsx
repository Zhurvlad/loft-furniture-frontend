import Head from 'next/head'
import React from 'react';
import {useDispatch} from 'react-redux';
import {useRouter} from 'next/router';

import {userSlice} from '../../store/reducers/UserSlice';
import {shoppingCartApi} from '../../store/shoppingCart/shoppingCart.api';
import {sofaSlice} from '../../store/reducers/SofaSlice';


import {useAppSelector} from '../../hooks/redux';

import {Api} from '../../utils/api/index';

import {IQueryParams} from '../../types/catalog';

import Custom404 from '../404';
import {Footer} from '../../components/modules/Footer/Footer';
import {Breadcrumbs} from '../../components/modules/Breadcrumbs/Breadcrumbs';
import {OneItemPage} from '../../components/templates/ItemPage/index';
import {MainLayout} from '../../components/layout/MainLayout';

import styles from '../../styles/itemPage/index.module.scss'



export default function ItemPage({query}: { query: IQueryParams }) {

  const router = useRouter()


  const {sofa} = useAppSelector((state) => state.sofa)
  const {theme} = useAppSelector((state) => state.theme)
  const {user} = useAppSelector((state) => state.user)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  //@ts-ignore
  const {data: cartItem} = shoppingCartApi.useGetUserCartQuery({userId: user?.user.userId})



  const [error, setError] = React.useState(false)

  const dispatch = useDispatch()

  const checkUser = async () => {
    //@ts-ignore
    if(!user?.user){
      const data = await Api().user.checkUser()
      dispatch(userSlice.actions.checkUser(data))
    }
  }

  React.useEffect(() => {
    checkUser()
  }, [])

  //@ts-ignore
  const getDefaultTextGenerator = React.useCallback((subpath) => subpath.replace('catalog', 'Каталог'), [])
  const getTextGenerator = React.useCallback((param: string) => ({}[param]), []);


  React.useEffect(() => {
    loadingSofa()
  }, [router.asPath])

  if (typeof window !== "undefined") {
    const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

    React.useEffect(() => {

      if (lastCrumb) {
        lastCrumb.textContent = sofa.name
      }

    }, [lastCrumb, sofa])
  }


  const loadingSofa = async () => {
    try {
      const data = await Api().sofas.getOne(query.itemId)


      if (!data) {
        setError(true)
        return
      }
      dispatch(sofaSlice.actions.getOneSofa(data))
    } catch (e) {
      console.log(e)
      setError(true)
    }
  }


  return (
    <>
      <Head>
        <title>Loft Мебель | {sofa ? sofa.name : ''} </title>
        <meta charSet='UTF-8'/>
        <meta httpEquiv='X-UA-Compatible' content='IE-edge'/>
        <meta name="description" content="Generated by create next app"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel={'icon'} type={'image/svg'} sizes={'32x32'} href={'/img/LogoSmall.svg'}/>
      </Head>
      {error
        ?
        <Custom404 darkModeClass={darkModeClass}/>
        :
        <MainLayout>
         <main>
           <Breadcrumbs
             getDefaultTextGenerator={getDefaultTextGenerator}
             getTextGenerator={getTextGenerator}
           />
           <OneItemPage darkModeClass={darkModeClass}/>
         </main>
        </MainLayout>
      }
    </>
  )
}


export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: {query: {...context.query}}
  }
}
