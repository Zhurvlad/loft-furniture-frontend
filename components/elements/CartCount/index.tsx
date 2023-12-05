import React from 'react';

import {CartMinusSvg} from '../CartMinusSvg/index';
import {CartPlusSvg} from '../CartPlusSvg/index';

import styles from '../../../styles/cartPage/index.module.scss';

export interface CartCountProps {
  item: any,
  darkModeClass: string,
  onPlusItem: (cartItemId: number, total_price: number, count: number) => void
  onMinusItem: (cartItemId: number, total_price: number, count: number) => void
}

export const CartCount:React.FC<CartCountProps> = ({item, darkModeClass, onMinusItem, onPlusItem}) => {

  const plus = item.count >= item.in_stocks ? `${styles.countDisabled}` : ''
  const minus = item.count === 1 ? `${styles.countDisabled}` : ''

    return (
      <div className={styles.cart__item__count}>
        {item.in_stocks !== 0
          ?
          <div>
            <button
              disabled={item.count === 1}
              onClick={() => onMinusItem(item.itemId, item.total_price - item.price, item.count - 1)}
              className={`${styles.cart__count__minus} ${darkModeClass} ${minus}`}>
              <CartMinusSvg/>
            </button>
            <span>{item.count}</span>
            <button onClick={() => onPlusItem(item.itemId, item.total_price + item.price, item.count + 1)}
                    disabled={item.count >= item.in_stocks}
                    className={`${styles.cart__count__plus} ${darkModeClass} ${plus}`}>
              <CartPlusSvg/>
            </button>
          </div>
          :
          <p className={`${styles.count__empty} ${darkModeClass}`}>Нет на складе</p>
        }
      </div>
    );
};

