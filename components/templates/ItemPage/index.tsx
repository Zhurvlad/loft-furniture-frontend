import React from 'react';
import Link from 'next/link';
import {useDispatch} from 'react-redux';

import {useAppSelector} from '../../../hooks/redux';

import {sofaColor} from '../../../utils/color';
import {toggleCartItem} from '../../../utils/shopping-cart';
import {formatPrice} from '../../../utils/common';

import {ItemPageList} from '../../modules/ItemPage/ItemPageList';
import {FavoriteSvg} from '../../elements/FavoriteSvg/index';
import {ItemCharacteristics} from '../../elements/ItemCharacteristics/index';

import spinnerStyles from '../../../styles/spinner/index.module.scss';
import styles from '../../../styles/itemPage/index.module.scss';


export const OneItemPage = ({darkModeClass}: { darkModeClass: string }) => {


  const {sofa} = useAppSelector((state) => state.sofa)
  const {user} = useAppSelector((state) => state.user)


  const [spinner, setSpinner] = React.useState(false)

  const {item} = useAppSelector((state) => state.cart)

  const dispatch = useDispatch()

  const isInCart = item?.some((cartItem) => cartItem.itemId === +sofa.id)
  //@ts-ignore
  const toggleCart = () => toggleCartItem(user && user.user?.username, +sofa.id, isInCart && isInCart, setSpinner, dispatch)
  const addedToCart = isInCart && `${styles.added}`

  const color = sofaColor.filter((i) => i.colorName === sofa.color)

  return (
    <div className={'container'}>
      <div className={styles.item__page}>
        <ItemPageList sofaItem={sofa}/>
        <div className={styles.item__info}>
          <h1 className={`${styles.item__title} ${darkModeClass}`}>{sofa.name}</h1>
          <p className={`${styles.item__subtitle} ${darkModeClass}`}>Диваны</p>
          <div className={styles.item__inner}>
            <p className={`${styles.item__price} ${darkModeClass}`}>{formatPrice(+sofa.price)} ₽</p>
            {
              sofa.in_stocks !== 0
                ?
                <button onClick={toggleCart} className={`${styles.item__btn} ${addedToCart}`}>
                  {
                    !isInCart
                      ?
                      <p>Добавить в корзину</p>
                      :
                      spinner
                        ?
                        <span className={spinnerStyles.spinner}/>
                        :
                        <Link href={'/cart'}>
                          <p>Перейти в корзину</p>
                        </Link>
                  }
                </button>
                :
                <p className={`${styles.item__empty} ${darkModeClass}`}>Нет на складе</p>
            }
            <div className={`${styles.item__favorite} ${darkModeClass} ${styles.active}`}>
              <FavoriteSvg/>
              <span>Добавить в желаемое</span>
            </div>
          </div>
          <div className={`${styles.item__color} ${darkModeClass}`}>
            <p>Цвет:<span>{color.map(i => i.colorNameRu)}</span></p>
            <input
              style={{backgroundColor: `${color.map(i => i.hex)}`}}
              className={`${styles.filters__color__checkbox} ${darkModeClass}  ${styles.active__color}`}
              type="checkbox"/>
          </div>
          <p
            className={`${styles.item__size} ${darkModeClass}`}>Размер(Ш×Д×В): <span> 288 СМ x 254 СМ x 148 СМ</span>
          </p>
          <p className={`${styles.item__description__title} ${darkModeClass}`}>Описание</p>
          <p className={`${styles.item__description__text} ${darkModeClass}`}>Лаконичные линии и простые формы,
            безупречный стиль и индивидуальность – все это диван «Динс».
            Сдержанный скандинавский дизайн украсит любую современную обстановку. Элегантность, комфорт и
            функциональность, собранные воедино – «Динс» просто создан для размеренного отдыха в кругу семьи или
            компании друзей!</p>
        </div>
      </div>
      <ItemCharacteristics darkModeClass={darkModeClass}/>
    </div>
  );
};

