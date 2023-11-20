import React from 'react';
import styles from '../../../styles/cartPage/index.module.scss'
import {DeleteSvg} from '../../elements/DeleteSvg/index';
import {formatPrice} from '../../../utils/common';
import {CartMinusSvg} from '../../elements/CartMinusSvg/index';
import {CartPlusSvg} from '../../elements/CartPlusSvg/index';

export const CartPage = () => {
  return (
    <div className={'container'}>
      <div className={styles.title}>
        <h1 className={styles.cart__title}>Корзина</h1>
        <h3 className={styles.cart__subtitle}>3 товара</h3>
      </div>
      <div className={styles.cart__header}>
        <div className={styles.cart__inner}>
          <ul>
            <li>Наименование</li>
          </ul>
          {/*<ul>
                <li>Артикуль</li>
              </ul>*/}
          <ul className={styles.cart__header__item}>
            <li>Цена</li>
            <li>Количество</li>
            <li>Сумма</li>
          </ul>
        </div>
      </div>
      <div className={styles.cart__item}>
        <div className={styles.cart__item__inner}>
          <img src="/img/sofa.png" alt=""/>
          <div>
            <h4 className={styles.cart__item__name}>Кускен Navy Blue</h4>
            <ul className={styles.cart__item__text}>
              <li className={styles.cart__item__color}>Цвет: <span>Темно-синий</span> <span
                className={styles.span__color}/></li>
              <li className={styles.cart__item__size}>Размер(Ш×Д×В):</li>
            </ul>
          </div>
        </div>
        <div className={styles.cart__item__order_info}>
          <p className={styles.cart__item__price}>{formatPrice(15000)} ₽</p>
          <div className={styles.cart__item__count}>
            <button className={styles.cart__count__minus}><CartMinusSvg/></button>
            <span>3</span>
            <button><CartPlusSvg/></button>
          </div>
          <p className={styles.cart__item__totalPrice}>{formatPrice(60000)} ₽ <span>{formatPrice(60000)} ₽</span></p>
          <button className={styles.btn__delete}><DeleteSvg/></button>
        </div>
      </div>
      <div className={styles.cart__item}>
        <div className={styles.cart__item__inner}>
          <img src="/img/sofa.png" alt=""/>
          <div>
            <h4 className={styles.cart__item__name}>Кускен Navy Blue</h4>
            <ul className={styles.cart__item__text}>
              <li className={styles.cart__item__color}>Цвет: <span>Темно-синий</span> <span
                className={styles.span__color}/></li>
              <li className={styles.cart__item__size}>Размер(Ш×Д×В):</li>
            </ul>
          </div>
        </div>
        <div className={styles.cart__item__order_info}>
          <p className={styles.cart__item__price}>{formatPrice(15000)} ₽</p>
          <div className={styles.cart__item__count}>
            <button className={styles.cart__count__minus}><CartMinusSvg/></button>
            <span>3</span>
            <button><CartPlusSvg/></button>
          </div>
          <p className={styles.cart__item__totalPrice}>{formatPrice(60000)} ₽</p>
          <button className={styles.btn__delete}><DeleteSvg/></button>
        </div>
      </div>
      <div className={styles.cart__details}>
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
  );
};

