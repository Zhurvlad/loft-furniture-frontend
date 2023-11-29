import React from 'react';
import Link from 'next/link';

import {useAppSelector} from '../../../hooks/redux';
import {TopSalesItemProps} from '../../../types/main-page';
import {formatPrice} from '../../../utils/common';

import {FavoriteSvg} from '../../elements/FavoriteSvg/index';
import {SalesSvg} from '../../elements/SalesSvg/index';
import {toggleCartItem} from '../../../utils/shopping-cart';
import {useDispatch} from 'react-redux';

import spinnerStyles from '../../../styles/spinner/index.module.scss'
import styles from '../../../styles/mainPage/index.module.scss';

//TODO Переделать название


export const TopSalesItem: React.FC<TopSalesItemProps> = ({sofa, sofaColor}) => {


  const {user} = useAppSelector(state => state.user)
  const {sofas} = useAppSelector(state => state.sofas)
  const {item} = useAppSelector(state => state.cart)


  const isInCart = item?.some((cartItem) => cartItem.itemId === sofa.id)

  const addedToCart = isInCart && `${styles.added}`

  const [spinner, setSpinner] = React.useState(false)

  const dispatch = useDispatch()

  const toggleCart = () => toggleCartItem(user?.user?.username,  sofa.id, isInCart && isInCart, setSpinner, dispatch)

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const itemDiscount = sofa.oldPrice > sofa.price
  const percentDiscount = sofa.oldPrice > sofa.price && Math.ceil(((sofa.oldPrice - sofa.price) / sofa.oldPrice) * 100)

  return (
    <div key={sofa.id} className={`${styles.main__top_sales__card} ${darkModeClass}`}>
      <Link href={`/catalog/${sofa.id}`}>
        <button className={`${styles.main__card__favorite} ${darkModeClass}`}>
          <FavoriteSvg/>
        </button>
        {itemDiscount &&
        <div>
        <span className={`${styles.main__card__sales} ${darkModeClass}`}>
          <SalesSvg/>
          <span>-{percentDiscount}%</span>
        </span>
        </div>
        }
        <img className={styles.main__card__img} src={JSON.parse(sofa.images)[0]} alt="content-img-1"/>
        {sofaColor && sofaColor.find((i) => i.colorName === sofa.color)
        && sofaColor.map(i => i.colorName === sofa.color
          ? (
            <div>
              <p className={`${styles.main__card__color__name} ${darkModeClass}`}>Цвет :</p>
              <p className={styles.main__card__color} style={{backgroundColor: `${i.hex}`}}/>
              <p>{sofa.furniture_brand}</p>
            </div>
          )
          : '')}
        <div className={styles.main__card__info}>
          <h4 className={`${styles.main__card__title} ${darkModeClass}`}>{sofa.name}</h4>
          <p className={`${styles.main__card__subtitle} ${darkModeClass}`}>Диваны</p>
          <div className={styles.main__card__price}>
            <p className={`${styles.main__card__price_new} ${darkModeClass}`}>{formatPrice(sofa.price)}₽</p>
            {itemDiscount &&
            <p
              className={`${styles.main__card__price_old} ${darkModeClass}`}>{formatPrice(sofa.oldPrice && sofa.oldPrice)}₽</p>}
          </div>
        </div>
      </Link>
      <button onClick={toggleCart} className={`${styles.main__card__add_btn} ${addedToCart}`}>
        {!isInCart
          ?
          <p>Добавить в корзину</p>
          :
          spinner ? <span
              className={spinnerStyles.spinner}
            /> :
            <Link href={'/cart'}>
              <p>Перейти в корзину</p>
            </Link>
        }
      </button>
    </div>
  );
};

