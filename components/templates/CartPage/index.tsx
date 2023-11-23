import React from 'react';
import styles from '../../../styles/cartPage/index.module.scss'
import {DeleteSvg} from '../../elements/DeleteSvg/index';
import {formatPrice} from '../../../utils/common';
import {CartMinusSvg} from '../../elements/CartMinusSvg/index';
import {CartPlusSvg} from '../../elements/CartPlusSvg/index';
import {useAppSelector} from '../../../hooks/redux';
import {sofaApi} from '../../../store/sofa/sofa.api';
import {shoppingCartApi} from '../../../store/shoppingCart/shoppingCart.api';
import {CartItem} from '../../modules/CartPage/CartItem';

export const CartPage = () => {

  //TODO: Проверить cookies

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const {user} = useAppSelector(state => state.user)


  const {data: cartItem, isLoading, error} = shoppingCartApi.useGetUserCartQuery({userId: user?.user.userId})

  console.log(cartItem && cartItem)

  return (
    <div className={'container'}>
      <div className={styles.title}>
        <h1 className={`${styles.cart__title} ${darkModeClass}`}>Корзина</h1>
        <h3 className={`${styles.cart__subtitle} ${darkModeClass}`}>3 товара</h3>
      </div>
     <div className={styles.cart__inner}>
       <div>
         {cartItem && cartItem.map((i) => <CartItem key={i.id} item={i}/>)}
       </div>
      <div className={styles.v}>
        <div className={`${styles.cart__details} ${darkModeClass}`}>
          <h5 className={styles.cart__details__title}>Детали заказа</h5>
          <div className={styles.cart__details__count}>
            <p> 2 товара </p>
            <div></div>
            <p>{formatPrice(15000)} ₽</p>
          </div>
          <div className={styles.cart__details__count}>
            <p> Скидка </p>
            <div></div>
            <p>{formatPrice(15000)} ₽</p>
          </div>
          <div className={styles.cart__details__count}>
            <p> Итого </p>
            <div></div>
            <p>{formatPrice(15000)} ₽</p>
          </div>
          <button className={styles.cart__details__order}>Оформить заказ</button>
        </div>
      </div>
     </div>
     {/* <div className={styles.cart__details}>
        <h5 className={styles.cart__details__title}>Детали заказа</h5>
        <div className={styles.cart__details__count}>
          <p> 2 товара </p>
          <div></div>
          <p>{formatPrice(15000)} ₽</p>
        </div>
        <div className={styles.cart__details__count}>
          <p> Скидка </p>
          <div></div>
          <p>{formatPrice(15000)} ₽</p>
        </div>
        <div className={styles.cart__details__count}>
          <p> Итого </p>
          <div></div>
          <p>{formatPrice(15000)} ₽</p>
        </div>
        <button className={styles.cart__details__order}>Оформить заказ</button>
      </div>*/}
    </div>
  );
};

