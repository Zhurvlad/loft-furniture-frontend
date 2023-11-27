import React, {FC} from 'react';
import styles from '../../../styles/cartPage/index.module.scss';
import {formatPrice} from '../../../utils/common';
import {CartMinusSvg} from '../../elements/CartMinusSvg/index';
import {CartPlusSvg} from '../../elements/CartPlusSvg/index';
import {DeleteSvg} from '../../elements/DeleteSvg/index';
import {useAppSelector} from '../../../hooks/redux';
import {ICartItems} from '../../../types/cart';
import {useDispatch} from 'react-redux';
import spinnerStyles from '../../../styles/spinner/index.module.scss';
import {cartSlice} from '../../../store/reducers/CartSlice';
import {setTimeout} from 'timers';
import axios from 'axios';
import {sofaColor} from '../../../utils/color';

export interface CartItemProps {
  item: ICartItems,
  removeCartItem: (id: number) => void,
  setSpinner: (arg: boolean) => void
}

export const CartItem: FC<CartItemProps> = ({item, removeCartItem, setSpinner}) => {

  const {theme} = useAppSelector((state) => state.theme)
  const {user} = useAppSelector(state => state.user)
  const {item: cart} = useAppSelector(state => state.cart)

  const dispatch = useDispatch()

  const sales = item.oldPrice > item.price

  const price = sales && (item.count * item.oldPrice) - item.price

  /*const isInCart = items.some((cartItem) => cartItem.itemId === item.id)*/

  const [spinnerItem, setSpinnerItem] = React.useState(false)

  const colorName = sofaColor.find((obj) => obj.colorName === item.color)

  const sofaSize = item.size.split('.', ).join(' СМ x ')





  const cartTotalCount = cart.reduce((sum, obj) => obj.count + sum, 0)


  const onPlusItem = async (cartItemId: number, total_price: number, count: number) => {
    try {
      setSpinner(true)
      setSpinnerItem(true)
      await axios.patch(`http://localhost:3002/shopping-cart/total-price/${cartItemId}`, {total_price: total_price})
      await axios.patch(`http://localhost:3002/shopping-cart/count/${cartItemId}`, {count: count})
      dispatch(cartSlice.actions.plusItem(cartItemId))
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        setSpinnerItem(false)
        setSpinner(false)
      }, 1000)
    }
  }

  const onMinusItem = async (cartItemId: number, total_price: number, count: number) => {
    try {
      setSpinner(true)
      await axios.patch(`http://localhost:3002/shopping-cart/total-price/${cartItemId}`, {total_price: total_price})
      await axios.patch(`http://localhost:3002/shopping-cart/count/${cartItemId}`, {count: count})
      dispatch(cartSlice.actions.minusItem(cartItemId))
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        setSpinner(false)
      }, 1000)
    }
  }

  /*const onPlusItem = (cartItemId: number, price: number, count: number) => {
    try {
      setSp(true)
      plusItem(cartItemId, price, count)
    } catch (e) {

    } finally {
      setTimeout(() => {setSp(false)}, 1000)
    }

  }*/


  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerClass = spinnerItem ? `${styles.spinner}` : ''
  const plus = item.count >= item.in_stocks ? `${styles.countDisabled}` : ''
  const minus = item.count === 1 ? `${styles.countDisabled}` : ''


  /*const toggleCart = () => toggleCartItem(user?.username, item.id, isInCart, setSpinner)*/


  return (
    <div className={styles.cart__item}>
      {spinnerItem
        ?
        <div className={styles.overlay}>
        <span style={{top: '37px', left: '47%', width: '50px', height: '50px'}}
              className={spinnerStyles.spinner}/>
        </div>
        : ''}
      <div className={styles.cart__item__inner}>
        <img src={item.image} alt=""/>
        <div className={styles.vvv}>
          <h4 className={`${styles.cart__item__name} ${darkModeClass}`}>{item.name}</h4>
          <ul className={`${styles.cart__item__text} ${darkModeClass}`}>
            <li className={`${styles.cart__item__color} ${darkModeClass}`}>Цвет: <span>{colorName.colorNameRu}</span>
              <span className={styles.span__color} style={{backgroundColor: `${colorName.hex}`}}/></li>
            <li className={styles.cart__item__size}>Размер(Ш×Д×В): <span>{sofaSize} СМ</span></li>
          </ul>
        </div>
      </div>
      <div className={`${styles.cart__item__order_info} ${darkModeClass}`}>
        <p
          className={`${styles.cart__item__price} ${darkModeClass}`}>{formatPrice(item.price)} ₽
          {sales && <span>{formatPrice(item.oldPrice)} ₽</span>}
        </p>

        <div className={styles.cart__item__count}>
          {item.in_stocks !== 0
            ?
            <div>
              <button
                disabled={item.count === 1}
                onClick={() => onMinusItem(item.itemId, item.total_price - item.price, item.count - 1)}
                className={`${styles.cart__count__minus} ${darkModeClass} ${minus}`}><CartMinusSvg/></button>
              <span>{item.count}</span>
              <button onClick={() => onPlusItem(item.itemId, item.total_price + item.price, item.count + 1)}
                      disabled={item.count >= item.in_stocks}
                      className={`${styles.cart__count__plus} ${darkModeClass} ${plus}`}><CartPlusSvg/></button>
            </div>
            :
            <p className={`${styles.count__empty} ${darkModeClass}`}>Нет на складе</p>
          }
        </div>
        <p
          className={`${styles.cart__item__totalPrice} ${darkModeClass}`}>{formatPrice(item.total_price)} ₽ </p>
        <button onClick={() => removeCartItem(item.itemId)} className={`${styles.btn__delete} ${darkModeClass}`}>
          <DeleteSvg/>
        </button>
      </div>
    </div>
  );
};

