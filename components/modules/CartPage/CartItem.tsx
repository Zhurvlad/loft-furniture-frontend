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

export interface CartItemProps {
  item: ICartItems,
  removeCartItem: (id: number) => void,
  spinner: boolean
}

export const CartItem: FC<CartItemProps> = ({item, removeCartItem, spinner}) => {

  const {theme} = useAppSelector((state) => state.theme)
  const {user} = useAppSelector(state => state.user)
  const {items} = useAppSelector(state => state.cart)

  const dispatch = useDispatch()

  /*const isInCart = items.some((cartItem) => cartItem.itemId === item.id)*/

  const [price, setPrice] = React.useState(item.total_price)


  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''
  const spinnerClass = spinner ? `${styles.spinner}` : ''
  const plus = item.count >= item.in_stocks ? `${styles.countDisabled}` : ''
  const minus = item.count === 1 ? `${styles.countDisabled}` : ''

  /*const toggleCart = () => toggleCartItem(user?.username, item.id, isInCart, setSpinner)*/


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
        <p
          className={`${styles.cart__item__price} ${darkModeClass}`}>{formatPrice(1234567)} ₽ <span>{formatPrice(item.oldPrice)} ₽</span>
        </p>

        <div className={styles.cart__item__count}>
          {item.in_stocks !== 0
            ?
            <div>
              <button className={`${styles.cart__count__minus} ${darkModeClass} ${minus}`}><CartMinusSvg/></button>
              <span>{item.count}</span>
              <button className={`${styles.cart__count__plus} ${darkModeClass} ${plus}`}><CartPlusSvg/></button>
            </div>
            :
            <p className={`${styles.count__empty} ${darkModeClass}`}>Нет на складе</p>
          }
        </div>
        <p
          className={`${styles.cart__item__totalPrice} ${darkModeClass}`}>{formatPrice(item.total_price * item.count)} ₽ </p>
        <button onClick={() => removeCartItem(item.itemId)} className={`${styles.btn__delete} ${darkModeClass}`}>
          {spinner
            ?
            <span style={{top: '-16px', left: '0'}}
                  className={spinnerStyles.spinner}/>
            :
            <DeleteSvg/>}
        </button>
      </div>
    </div>
  );
};

