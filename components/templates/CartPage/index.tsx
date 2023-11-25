import React from 'react';
import {useDispatch} from 'react-redux';

import {useAppSelector} from '../../../hooks/redux';
import {shoppingCartApi} from '../../../store/shoppingCart/shoppingCart.api';
import {cartSlice} from '../../../store/reducers/CartSlice';

import {CartItem} from '../../modules/CartPage/CartItem';
import {EmptyCart} from '../../modules/CartPage/EmptyCart';
import {OrderDetails} from '../../modules/CartPage/OrderDetails';

import styles from '../../../styles/cartPage/index.module.scss'
import {setTimeout} from "timers";
import axios from 'axios';

export const CartPage = () => {

  //TODO: Проверить cookies

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const dispatch = useDispatch()


  const {user} = useAppSelector(state => state.user)
  const {item} = useAppSelector(state => state.cart)

  const [spinner, setSpinner] = React.useState(false)




  const {data: cartItem, isLoading, error} = shoppingCartApi.useGetUserCartQuery({userId: user?.user.userId})

  const [firstRender, setFirstRender] = React.useState(false)

  React.useEffect(() => {
    setFirstRender(true)
  }, [])

  React.useEffect(() => {
    loadCartItems()
  }, [cartItem])

  const loadCartItems = () => {
    try {
      dispatch(cartSlice.actions.setCartItem(cartItem))
    } catch (e) {
      console.log(e)
    }
  }

  const removeCartItem = async (itemId: number) => {
    try {
      setSpinner(true)
      await axios.delete(`http://localhost:3002/shopping-cart/one/${itemId}`)
      dispatch(cartSlice.actions.removeCartItem(itemId))
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        setSpinner(false)
      }, 1000)
    }
  }

  const plusItem = () => {
    try {

    } catch (e) {
      console.log(e)
    } finally {

    }
  }

  return (
    <div className={'container'}>
      <div className={styles.title}>
        <h1 className={`${styles.cart__title} ${darkModeClass}`}>Корзина</h1>
        {item && item.length !== 0
        && <h3 className={`${styles.cart__subtitle} ${darkModeClass}`}>{cartItem?.length} товара</h3>}
      </div>
      {item &&
        item?.length !== 0
          ?
          <div className={styles.cart__inner}>
            <div>
              {item && item.map((i) => <CartItem removeCartItem={removeCartItem} spinner={spinner} key={i.id}
                                                 item={i}/>)}
            </div>
            <OrderDetails totalCount={cartItem?.length} darkModeClass={darkModeClass}/>
          </div>
          :
          <EmptyCart darkModeClass={darkModeClass}/>
      }
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

