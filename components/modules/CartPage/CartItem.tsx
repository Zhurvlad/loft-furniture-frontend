import React, {FC} from 'react';
import styles from '../../../styles/cartPage/index.module.scss';
import {formatPrice} from '../../../utils/common';
import {CartMinusSvg} from '../../elements/CartMinusSvg/index';
import {CartPlusSvg} from '../../elements/CartPlusSvg/index';
import {DeleteSvg} from '../../elements/DeleteSvg/index';
import {useAppSelector} from '../../../hooks/redux';
import {ICart, ICartItems} from '../../../types/cart';

export interface CartItemProps {
  item: ICartItems
}

export const CartItem:FC<CartItemProps> = ({item}) => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

    return (
      <div className={styles.cart__item}>
        <div className={styles.cart__item__inner}>
          <img src={item.image} alt=""/>
          <div className={styles.vvv}>
            <h4 className={`${styles.cart__item__name} ${darkModeClass}`}>{item.name}</h4>
            <ul className={`${styles.cart__item__text} ${darkModeClass}`}>
              <li className={`${styles.cart__item__color} ${darkModeClass}`}>Цвет: <span>Темно-синий</span> <span
                className={styles.span__color}/></li>
              <li className={styles.cart__item__size}>Размер(Ш×Д×В): <span>218 СМ × 195 СМ × 190 СМ</span></li>
            </ul>
          </div>
        </div>
        <div className={`${styles.cart__item__order_info} ${darkModeClass}`}>
          <p className={`${styles.cart__item__price} ${darkModeClass}`}>{formatPrice(item.price)} ₽</p>
          <div className={styles.cart__item__count}>
            <button className={`${styles.cart__count__minus} ${darkModeClass}`}><CartMinusSvg/></button>
            <span>3</span>
            <button className={`${styles.cart__count__plus} ${darkModeClass}`}><CartPlusSvg/></button>
          </div>
          <p className={`${styles.cart__item__totalPrice} ${darkModeClass}`}>{formatPrice(item.total_price)} ₽ <span>{formatPrice(item.oldPrice)} ₽</span></p>
          <button className={`${styles.btn__delete} ${darkModeClass}`}><DeleteSvg/></button>
        </div>
      </div>
    );
};

