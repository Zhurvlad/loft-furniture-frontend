import Head from 'next/head'
import React from 'react';
import {CatalogPage} from '../../components/templates/CatalogPage/index';
import {Header} from '../../components/modules/Header/Header';
import {Footer} from '../../components/modules/Footer/Footer';
import {IQueryParams} from '../../types/catalog';
import styles from '../../styles/itemPage/index.module.scss'
import {FavoriteSvg} from '../../components/elements/FavoriteSvg/index';
import {useAppSelector} from '../../hooks/redux';
import {formatPrice} from '../../utils/common';

export default function ItemPage({query}: { query: IQueryParams }) {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''


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
      <div className={'container'}>
        <div className={styles.item__page}>
          <div className={styles.item__img}>
            <img src="/img/itemPage.png" alt=""/>
          </div>
          <div className={styles.item__info}>
            <h1 className={`${styles.item__title} ${darkModeClass}`}>Динс Velvet Yellow</h1>
            <p className={`${styles.item__subtitle} ${darkModeClass}`}>Диваны</p>
            <div className={styles.item__inner}>
              <p className={`${styles.item__price} ${darkModeClass}`}>4 690₽</p>
              <button className={styles.item__btn}>Купить</button>
              <div className={`${styles.item__favorite} ${darkModeClass} ${styles.active}`}>
                <FavoriteSvg/>
                <span>Добавить в желаемое</span>
              </div>
            </div>
            <div className={styles.item__color}>
              <p>Цвет : <span>Белый</span></p>
              <input
                style={{backgroundColor: 'black'}}
                className={`${styles.filters__color__checkbox} ${darkModeClass}  ${styles.active__color}`}
                type="checkbox"/>
              <input
                style={{backgroundColor: 'black'}}
                className={`${styles.filters__color__checkbox} ${darkModeClass} `}
                type="checkbox"/>
              <input
                style={{backgroundColor: 'black'}}
                className={`${styles.filters__color__checkbox} ${darkModeClass} `}
                type="checkbox"/>
              <input
                style={{backgroundColor: 'black'}}
                className={`${styles.filters__color__checkbox} ${darkModeClass} `}
                type="checkbox"/>
            </div>
            <p className={styles.item__size}>Размер(Ш×Д×В): <span> 288 СМ x 254 СМ x 148 СМ</span></p>
            <p className={`${styles.item__description__title} ${darkModeClass}`}>Описание</p>
            <p className={`${styles.item__description__text} ${darkModeClass}`}>Лаконичные линии и простые формы,
              безупречный стиль и индивидуальность – все это диван «Динс».
              Сдержанный скандинавский дизайн украсит любую современную обстановку. Элегантность, комфорт и
              функциональность, собранные воедино – «Динс» просто создан для размеренного отдыха в кругу семьи или
              компании друзей!</p>
          </div>
        </div>
        <div className={styles.item__characteristics}>
          <p className={styles.item__characteristics__title}>Характеристики</p>
          <div className={styles.item__characteristics__inner}>
            <div>
              <div className={styles.cart__details__count}>
                <p> Итого </p>
                <div/>
                <p>{formatPrice(123123123)} ₽</p>
              </div>
            </div>
            <div>
              <div className={styles.cart__details__count}>
                <p> Итого </p>
                <div/>
                <p>{formatPrice(123123123)} ₽</p>
              </div>
            </div><div>
              <div className={styles.cart__details__count}>
                <p> Итого </p>
                <div/>
                <p>{formatPrice(123123123)} ₽</p>
              </div>
            </div><div>
              <div className={styles.cart__details__count}>
                <p> Итого </p>
                <div/>
                <p>{formatPrice(123123123)} ₽</p>
              </div>
            </div><div>
              <div className={styles.cart__details__count}>
                <p> Итого </p>
                <div/>
                <p>{formatPrice(123123123)} ₽</p>
              </div>
            </div><div>
              <div className={styles.cart__details__count}>
                <p> Итого </p>
                <div/>
                <p>{formatPrice(123123123)} ₽</p>
              </div>
            </div><div>
              <div className={styles.cart__details__count}>
                <p> Итого </p>
                <div/>
                <p>{formatPrice(123123123)} ₽</p>
              </div>
            </div><div>
              <div className={styles.cart__details__count}>
                <p> Итого </p>
                <div/>
                <p>{formatPrice(123123123)} ₽</p>
              </div>
            </div><div>
              <div className={styles.cart__details__count}>
                <p> Итого </p>
                <div/>
                <p>{formatPrice(123123123)} ₽</p>
              </div>
            </div><div>
              <div className={styles.cart__details__count}>
                <p> Итого </p>
                <div/>
                <p>{formatPrice(123123123)} ₽</p>
              </div>
            </div><div>
              <div className={styles.cart__details__count}>
                <p> Итого </p>
                <div/>
                <p>{formatPrice(123123123)} ₽</p>
              </div>
            </div><div>
              <div className={styles.cart__details__count}>
                <p> Итого </p>
                <div/>
                <p>{formatPrice(123123123)} ₽</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}


export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: {query: {...context.query}}
  }
}