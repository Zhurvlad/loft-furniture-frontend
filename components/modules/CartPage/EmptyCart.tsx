import React from 'react';
import Link from 'next/link';

import {EmptyCartSvg} from '../../elements/EmptyCartSvg/index';

import styles from '../../../styles/cartPage/index.module.scss';


export type EmptyCartProps = {
  darkModeClass: string,
}

export const EmptyCart: React.FC<EmptyCartProps> = ({darkModeClass}) => {
  return (
    <div className={`${styles.emptyCart} ${darkModeClass}`}>
      <EmptyCartSvg/>
      <h4 className={`${styles.emptyCart__title} ${darkModeClass}`}>Ваша корзина на данный момент пуста.</h4>
      <p className={`${styles.emptyCart__text} ${darkModeClass}`}>Прежде чем приступить к оформлению заказа, вы должны
        добавить некоторые товары в корзину. На странице
        "Каталог" вы найдете много интересных товаров.</p>
      <Link href={'/catalog'} legacyBehavior passHref>
        <a>
          <button className={styles.return__btn}>Перейти в каталог</button>
        </a>
      </Link>
    </div>
  );
};

