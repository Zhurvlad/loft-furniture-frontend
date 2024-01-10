import React from 'react';
import {useRouter} from 'next/router';
import {toast} from 'react-toastify';

import {cartSlice} from '../../../store/reducers/CartSlice';

import {useAppDispatch, useAppSelector} from '../../../hooks/redux';

import {formatPrice} from '../../../utils/common';
import {Api} from '../../../utils/api/index';

import styles from '../../../styles/cartPage/index.module.scss';

export type OrderDetailsProps = {
  darkModeClass: string,
  totalCount: number,
  cartTotalPrice: number,
  cartTotalCount: number,
  sales: number,
  spinner: boolean,
  cartContinue: boolean,
  totalPrice: number

}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
                                                            darkModeClass,
                                                            cartTotalPrice,
                                                            cartTotalCount,
                                                            sales,
                                                            spinner,
                                                            cartContinue,
                                                            totalPrice
                                                          }) => {

  const {user} = useAppSelector(state => state.user)
  const {city} = useAppSelector(state => state.city)


  const router = useRouter()
  const dispatch = useAppDispatch()


  React.useEffect(() => {
    const paymentId = sessionStorage.getItem('paymentId')

    if (paymentId) {
      checkPayment(paymentId)
    }
  }, [])

  const makePay = async () => {
    try {
      const data = await Api().payment.makePayment({
        amount: cartTotalPrice,
        //@ts-ignore
        description: `Заказ №1 ${city.city.length ? `Город: ${city.city}, улица: ${city.street}` : ''}`
      })

      sessionStorage.setItem('paymentId', data.id)

      await router.push(data.confirmation.confirmation_url)


    } catch (e) {
      console.log(e)
    }
  }

  const resetCart = async () => {
    sessionStorage.removeItem('paymentId')
    //@ts-ignore
    await Api().cart.removeAllCartItem(+user?.user.userId)
    dispatch(cartSlice.actions.setCartItem([]))
  }

  const checkPayment = async (paymentId: string) => {

    try {
      const data = await Api().payment.checkPayment(paymentId)
      //@ts-ignore
      if (data.status === 'succeeded') {
        await resetCart()
      }

    } catch (e) {
      toast.error('Произошла неизвестная ошибка!')
      await resetCart()
    }
  }


  return (
    <div className={styles.cart__details}>
      <div className={`${styles.cart__details__inner} ${darkModeClass}`}>
        <h5 className={styles.cart__details__title}>Детали заказа</h5>
        <div className={styles.cart__details__count}>
          <p> {cartTotalCount} товара </p>
          <div/>
          <p>{formatPrice(totalPrice)} ₽</p>
        </div>
        {sales ? <div className={styles.cart__details__count}>
          <p> Скидка </p>
          <div/>
          <p>{formatPrice(sales)} ₽</p>
        </div> : ''}
        <div className={styles.cart__details__count}>
          <p> Итого </p>
          <div/>
          <p>{formatPrice(cartTotalPrice)} ₽</p>
        </div>
        <button onClick={makePay} disabled={cartContinue || spinner} className={styles.cart__details__order}>Оформить
          заказ
        </button>
      </div>
    </div>
  );
};

