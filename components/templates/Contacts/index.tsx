import React from 'react';

import {useAppSelector} from '../../../hooks/redux';

import styles from '../../../styles/contacts/index.module.scss'

export const ContactsPage = () => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <section className={styles.contacts}>
      <div className="container">
        <h2 className={`${styles.contacts__title} ${darkModeClass}`}>
          Контакты
        </h2>
        <div className={styles.contacts__inner}>
          <ul className={`${styles.contacts__list} ${darkModeClass}`}>
            <li className={styles.contacts__list__title}>
              <h3 className={darkModeClass}>
                Магазин мебели
              </h3>
            </li>
            <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
              <span>Офис:</span>
              <span> г. Анапа, Анапское шоссе,30 Ж/К Черное море</span>
            </li>
            <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
              <span>Склад:</span>
              <span> г. Анапа, Анапское шоссе,30 Ж/К Черное море</span>
            </li>
            <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
              <span>График работы офиса:</span>
              <span> пн-пс: с 8:00 до 22:00</span>
            </li>
            <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
              <span>Наш контактный телефон:</span>
              <span> +7(8095) 555-55-55</span>
            </li>
            <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
              <span>Время приемок завок:</span>
              <span> Пн-Вс: с 8:00 до 22:00</span>
            </li>
            <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
              <span>Прием заказов электронным способом на сайте:</span>
              <span> круглосуточно</span>
            </li>
            <li className={`${styles.contacts__list__item} ${darkModeClass}`}>
              <span>E-mail:</span>
              <span className={styles.contacts__list__item__mail}>
                  {' '}
                <span>mebel_loft_anapa@mail.ru</span>
                </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
};

