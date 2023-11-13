import React from 'react';
import Link from 'next/link';

import {useAppSelector} from '../../../hooks/redux';
import {TopSalesItemProps} from '../../../types/main-page';
import {formatPrice} from '../../../utils/common';

import {FavoriteSvg} from '../../elements/FavoriteSvg/index';
import {SalesSvg} from '../../elements/SalesSvg/index';
import styles from '../../../styles/mainPage/index.module.scss';


export const TopSalesItem: React.FC<TopSalesItemProps> = ({sofa}) => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const itemDiscount = sofa.oldPrice > sofa.price
  const percentDiscount = sofa.oldPrice > sofa.price && Math.ceil(((sofa.oldPrice - sofa.price) / sofa.oldPrice) * 100)

  return (
    <div key={sofa.id} className={`${styles.main__top_sales__card} ${darkModeClass}`}>
      <Link href={''}>
        <button className={`${styles.main__card__favorite} ${darkModeClass}`}>
          <FavoriteSvg/>
        </button>
        {itemDiscount &&
        <div>
        <span className={`${styles.main__card__sales} ${darkModeClass}`}>
          <SalesSvg/>
          <span>-{percentDiscount}%</span>
        </span>
        </div>
        }
        <img className={styles.main__card__img} src={JSON.parse(sofa.images)[0]} alt="content-img-1"/>
        <div className={styles.main__card__info}>
          <h4 className={`${styles.main__card__title} ${darkModeClass}`}>{sofa.name}</h4>
          <p className={`${styles.main__card__subtitle} ${darkModeClass}`}>Диваны</p>
          <div className={styles.main__card__price}>
            <p className={`${styles.main__card__price_new} ${darkModeClass}`}>{formatPrice(sofa.price)}₽</p>
            {itemDiscount &&
            <p className={`${styles.main__card__price_old} ${darkModeClass}`}>{formatPrice(sofa.oldPrice && sofa.oldPrice)}₽</p>}
          </div>
        </div>
      </Link>
      <button className={styles.main__card__add_btn}>
        Добавить в корзину
      </button>
    </div>
  );
};

