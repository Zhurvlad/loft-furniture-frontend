import React from 'react';
import styles from '../../../styles/about/index.module.scss'
import {useAppSelector} from '../../../hooks/redux';

export const AboutPage = () => {


  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

    return (
        <div className={'container'}>
         <h1 className={`${styles.about__title} ${darkModeClass}`}>О компании</h1>
          <div className={styles.about__inner}>
            <div className={styles.about__text__inner}>
              <h4 className={`${styles.about__subtitle} ${darkModeClass}`}>Интернет-магазин «Лофт Мебель»: купите хорошую мебель в один клик!</h4>
              <p className={`${styles.about__text} ${darkModeClass}`}>Уникальный формат интернет-магазина позволит вам купить лучшую
                мебель крупнейших российских фабрик максимально быстро и по
                выгодной цене!

                Мы благодарим за доверие более десятка производителей, которые дали
                нам возможность представлять лучшие образцы их продукции в
                российском интернет-пространстве. Прямые договоры на поставку
                мебели с фабрик обеспечивают наиболее привлекательные условия для
                наших покупателей.</p>
            </div>
            <img src="/img/about__img.png" alt="img"/>
          </div>
        </div>
    );
};

