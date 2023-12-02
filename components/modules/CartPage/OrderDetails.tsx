import React from 'react';
import styles from '../../../styles/cartPage/index.module.scss';
import {formatPrice} from '../../../utils/common';
import {PaymentApi} from '../../../utils/api/payment';
import {useRouter} from 'next/router';
import {Api} from '../../../utils/api/index';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {LoginUserResponse, ResponseLoginUser} from '../../../types/auth';
import {useDispatch} from 'react-redux';
import {cartSlice} from '../../../store/reducers/CartSlice';

export type OrderDetailsProps = {
  darkModeClass: string,
  totalCount: number,
  cartTotalPrice: number,
  cartTotalCount: number,
  sales: number,
  spinner: boolean,
  cartContinue: boolean

}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
                                                            darkModeClass,
                                                            cartTotalPrice,
                                                            cartTotalCount,
                                                            sales,
                                                            spinner,
                                                            cartContinue
                                                          }) => {

  const {user} = useAppSelector(state => state.user)



  const router = useRouter()
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    const paymentId = sessionStorage.getItem('paymentId')

    if(paymentId){
      checkPayment(paymentId)
    }
  }, [])

  const makePay = async () => {
    try {
      const data =  await Api().payment.makePayment({amount: cartTotalPrice, description: 'Заказ #1'})

      sessionStorage.setItem('paymentId', data.id)

      await router.push(data.confirmation.confirmation_url)


    } catch (e) {
      console.log(e)
    }
  }

  const resetCart = async () => {
    sessionStorage.removeItem('paymentId')
    await Api().cart.removeAllCartItem(+user?.user.userId)
    dispatch(cartSlice.actions.setCartItem([]))
  }

  const checkPayment = async (paymentId: string) => {

   try {
     const data = await Api().payment.checkPayment(paymentId)

     if(data.status === 'succeeded'){
       await resetCart()
     }

   } catch (e) {
     console.log(e)
     await resetCart()
   }


  }


  return (
    <div className={styles.v}>
      <div className={`${styles.cart__details} ${darkModeClass}`}>
        <h5 className={styles.cart__details__title}>Детали заказа</h5>
        <div className={styles.cart__details__count}>
          <p> {cartTotalCount} товара </p>
          <div/>
          <p>{formatPrice(cartTotalPrice)} ₽</p>
        </div>
        {sales ? <div className={styles.cart__details__count}>
          <p> Скидка </p>
          <div/>
          <p>{formatPrice(sales)} ₽</p>
        </div> : ''}
        <div className={styles.cart__details__count}>
          <p> Итого </p>
          <div/>
          <p>{formatPrice(cartTotalPrice - sales)} ₽</p>
        </div>
        <button onClick={makePay} disabled={cartContinue || spinner} className={styles.cart__details__order}>Оформить заказ</button>
      </div>
    </div>
  );
};

