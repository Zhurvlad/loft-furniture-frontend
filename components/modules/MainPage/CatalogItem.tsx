import React from 'react';
import Link from 'next/link';
import {useDispatch} from 'react-redux';

import {useAppSelector} from '../../../hooks/redux';

import {formatPrice} from '../../../utils/common';
import {sofaColor} from '../../../utils/color';
import {toggleCartItem} from '../../../utils/shopping-cart';

import {TopSalesItemProps} from '../../../types/main-page';

import {FavoriteSvg} from '../../elements/FavoriteSvg/index';
import {SalesSvg} from '../../elements/SalesSvg/index';

import spinnerStyles from '../../../styles/spinner/index.module.scss'
import styles from '../../../styles/mainPage/index.module.scss';


export const CatalogItem: React.FC<TopSalesItemProps> = ({sofa}) => {

  const {user} = useAppSelector(state => state.user)
  const {item} = useAppSelector(state => state.cart)
  const {theme} = useAppSelector((state) => state.theme)

  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const isInCart = item?.some((cartItem) => cartItem.itemId === sofa.id)
  const addedToCartCSS = isInCart && `${styles.added}`

  const [spinner, setSpinner] = React.useState(false)

  const dispatch = useDispatch()


  const toggleCart = () => toggleCartItem(user?.user?.username, sofa.id, isInCart && isInCart, setSpinner, dispatch)

  const itemDiscount = sofa.oldPrice > sofa.price
  const percentDiscount = itemDiscount && Math.ceil(((sofa.oldPrice - sofa.price) / sofa.oldPrice) * 100)

  const colorHex = sofaColor.filter((i) => i.colorName === sofa.color).map(i => i.hex)

  return (
    <div key={sofa.id} className={`${styles.main__top_sales__card} ${darkModeClass}`}>
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
      <Link href={`/catalog/${sofa.id}`}>
        <img className={styles.main__card__img} src={JSON.parse(sofa.images)[0]} alt="content-img-1"/>
        <div>
          <p className={`${styles.main__card__color__name} ${darkModeClass}`}>Цвет :</p>
          <p className={styles.main__card__color} style={{backgroundColor: `${colorHex}`}}/>
        </div>
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
      {
        sofa.in_stocks !== 0
          ? <button onClick={toggleCart} className={`${styles.main__card__add_btn} ${addedToCartCSS}`}>
            {
              !isInCart
                ?
                <p>Добавить в корзину</p>
                :
                spinner
                  ?
                  <span className={spinnerStyles.spinner} style={{left: '45%'}}/>
                  :
                  <Link href={'/cart'}>
                    <p>Перейти в корзину</p>
                  </Link>
            }
          </button>
          :
          <p className={`${styles.main__card__empty} ${darkModeClass}`}>Нет на складе</p>
      }
    </div>
  );
};

