import React, {FC} from 'react';
import {setTimeout} from 'timers';
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';

import {formatPrice} from '../../../utils/common';
import {useAppSelector} from '../../../hooks/redux';
import {ICartItems} from '../../../types/cart';
import {Api} from '../../../utils/api/index';
import {cartSlice} from '../../../store/reducers/CartSlice';
import {sofaColor} from '../../../utils/color';

import {DeleteSvg} from '../../elements/DeleteSvg/index';
import {CartCount} from '../../elements/CartCount/index';

import spinnerStyles from '../../../styles/spinner/index.module.scss';
import styles from '../../../styles/cartPage/index.module.scss';


export interface CartItemProps {
  item: ICartItems,
  removeCartItem: (id: number) => void,
  setSpinner: (arg: boolean) => void
}

export const CartItem: FC<CartItemProps> = ({item, removeCartItem, setSpinner}) => {

  const dispatch = useDispatch()

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const [spinnerItem, setSpinnerItem] = React.useState(false)

  /*const plus = item.count >= item.in_stocks ? `${styles.countDisabled}` : ''
  const minus = item.count === 1 ? `${styles.countDisabled}` : ''*/
  const sales = item.oldPrice > item.price
  const colorName = sofaColor.find((obj) => obj.colorName === item.color)
  const sofaSize = item.size.split('.',).join(' СМ x ')

  const updatePriceCount = async (cartItemId: number, total_price: number, count: number) => {
    setSpinner(true)
    setSpinnerItem(true)
    await Api().cart.updateTotalPrice(cartItemId, total_price)
    await Api().cart.updateTotalCount(cartItemId, count)
  }

  const onPlusItem = async (cartItemId: number, total_price: number, count: number) => {
    try {
      await updatePriceCount(cartItemId, total_price, count)
      dispatch(cartSlice.actions.plusItem(cartItemId))
    } catch (e) {
      console.log(e)
      toast.error('Произошла неизвестная ошибка')
    } finally {
      setTimeout(() => {
        setSpinnerItem(false)
        setSpinner(false)
      }, 1000)
    }
  }

  const onMinusItem = async (cartItemId: number, total_price: number, count: number) => {
    try {
      await updatePriceCount(cartItemId, total_price, count)
      dispatch(cartSlice.actions.minusItem(cartItemId))
    } catch (e) {
      console.log(e)
      toast.error('Произошла неизвестная ошибка')
    } finally {
      setTimeout(() => {
        setSpinnerItem(false)
        setSpinner(false)
      }, 1000)
    }
  }

  return (
    <div className={styles.cart__item}>
      {spinnerItem
        ?
        <div className={styles.overlay}>
        <span style={{top: '37px', left: '47%', width: '50px', height: '50px'}}
              className={spinnerStyles.spinner}/>
        </div>
        :
        ''
      }
      <div className={styles.cart__item__inner}>
        <img src={item.image} alt={item.name}/>
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
        <p className={`${styles.cart__item__price} ${darkModeClass}`}>{formatPrice(item.price)} ₽
          {sales && <span>{formatPrice(item.oldPrice)} ₽</span>}
        </p>
        <CartCount item={item} darkModeClass={darkModeClass} onPlusItem={onPlusItem} onMinusItem={onMinusItem}/>
        <p className={`${styles.cart__item__totalPrice} ${darkModeClass}`}>{formatPrice(item.total_price)} ₽ </p>
        <button onClick={() => removeCartItem(item.itemId)} className={`${styles.btn__delete} ${darkModeClass}`}>
          <DeleteSvg/>
        </button>
      </div>
    </div>
  );
};

