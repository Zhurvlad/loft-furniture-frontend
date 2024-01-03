import React from 'react';
import {useDispatch} from 'react-redux';
import {setTimeout} from "timers";
import {toast} from 'react-toastify';

import {shoppingCartApi} from '../../../store/shoppingCart/shoppingCart.api';
import {cartSlice} from '../../../store/reducers/CartSlice';
import {userSlice} from '../../../store/reducers/UserSlice';

import {useAppSelector} from '../../../hooks/redux';

import {Api} from '../../../utils/api/index';

import {CartItem} from '../../modules/CartPage/CartItem';
import {EmptyCart} from '../../modules/CartPage/EmptyCart';
import {OrderDetails} from '../../modules/CartPage/OrderDetails';

import {Accordion} from '../../elements/Accordion/index';

import styles from '../../../styles/cartPage/index.module.scss'

export const CartPage = () => {

  const dispatch = useDispatch()

  const {theme} = useAppSelector((state) => state.theme)
  const {user } = useAppSelector(state => state.user)
  const {item} = useAppSelector(state => state.cart)
  const {item: cart} = useAppSelector(state => state.cart)

  //@ts-ignore
  const {data: cartItem} = shoppingCartApi.useGetUserCartQuery({userId: user?.user.userId})

  const [spinner, setSpinner] = React.useState(false)
  /*const [firstRender, setFirstRender] = React.useState(false)*/
  const [cartContinue, setCartContinue] = React.useState(true)

  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''


  const checkUser = async () => {
    //@ts-ignore
    if(!user?.user){
      const data = await Api().user.checkUser()
      dispatch(userSlice.actions.checkUser(data))
    }
  }

  React.useEffect(() => {
    checkUser()
  }, [])

  const cartTotalCount = cart?.reduce((sum, obj) => obj.count + sum , 0)
  const cartTotalPrice = cart?.reduce((sum, obj) => obj.total_price + sum , 0)
  const totalSales = cart?.map((i) => i.oldPrice > i.price ? (i.oldPrice * i.count) - i.price : 0).reduce((sum , obj) =>  obj + sum, 0)

/*  React.useEffect(() => {
    setFirstRender(true)
  }, [])*/

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

      await Api().cart.removeCartItem(itemId)

      dispatch(cartSlice.actions.removeCartItem(itemId))
    } catch (e) {
      toast.error('Произошла неизвестная ошибка')
    } finally {
      setTimeout(() => {
        setSpinner(false)
      }, 1000)
    }
  }

  const toggleCartContinue = () => {
    setCartContinue(!cartContinue)
  }

  return (
    <div className={'container'}>
      <div className={styles.title}>
        <h1 className={`${styles.cart__title} ${darkModeClass}`}>Оформление заказа</h1>
        {/*{item && item.length !== 0
        && <h3 className={`${styles.cart__subtitle} ${darkModeClass}`}>{cartTotalCount} товара</h3>}*/}
      </div>
      {item &&
        item?.length !== 0
          ?
          <div className={styles.cart__inner}>
            <div className={styles.filter__list__inner}>
              <Accordion inCart title={`Корзина `} cartContinue={cartContinue} cartTotalCount={cartTotalCount} toggleCartContinue={toggleCartContinue}>

                <li className={styles.filters__list__item}>
                  <div>
                    {item && item.map((i) => <CartItem  removeCartItem={removeCartItem}  setSpinner={setSpinner} key={i.id} item={i}/>)}
                  </div>

                </li>
                <div className={styles.btn__cont}>
                  <button onClick={toggleCartContinue} className={styles.btn__continue}>Продолжить</button>
                </div>
              </Accordion>
            </div>
            {/*//@ts-ignore*/}
            <OrderDetails cartContinue={cartContinue} spinner={spinner} sales={totalSales} cartTotalCount={cartTotalCount} cartTotalPrice={cartTotalPrice} totalCount={cartItem?.length} darkModeClass={darkModeClass}/>
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

