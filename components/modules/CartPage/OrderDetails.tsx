import React from 'react';
import styles from '../../../styles/cartPage/index.module.scss';
import {formatPrice} from '../../../utils/common';

export type OrderDetailsProps = {
  darkModeClass: string,
  totalCount: number,
  cartTotalPrice: number,
  cartTotalCount: number,
  sales: number
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({darkModeClass, totalCount, cartTotalPrice, cartTotalCount, sales}) => {


  return (
    <div className={styles.v}>
      <div className={`${styles.cart__details} ${darkModeClass}`}>
        <h5 className={styles.cart__details__title}>Детали заказа</h5>
        <div className={styles.cart__details__count}>
          <p> {cartTotalCount} товара </p>
          <div/>
          <p>{formatPrice(cartTotalPrice)} ₽</p>
        </div>
        <div className={styles.cart__details__count}>
          <p> Скидка </p>
          <div/>
          <p>{formatPrice(sales)} ₽</p>
        </div>
        <div className={styles.cart__details__count}>
          <p> Итого </p>
          <div/>
          <p>{formatPrice(cartTotalPrice - sales)} ₽</p>
        </div>
        <button className={styles.cart__details__order}>Оформить заказ</button>
      </div>
    </div>
  );
};

