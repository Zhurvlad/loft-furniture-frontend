import React from 'react';

import {sofaApi} from '../../../store/sofa/sofa.api';

import {useAppSelector} from '../../../hooks/redux';

import {ISofas} from '../../../models/ISofas';

import {CatalogItem} from './CatalogItem';

import skeletonStyles from '../../../styles/skeletonStyles/index.module.scss'
import styles from '../../../styles/mainPage/index.module.scss';

export const TopSales = () => {

  const {data: sofas, isLoading, error} = sofaApi.useGetSofasBestsellersQuery({limit: 12, offset: 0})
  const {theme} = useAppSelector((state) => state.theme)



  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const sofaItem = sofas as ISofas

  return (
    <div className={styles.main__top_sales}>
      <h2 className={`${styles.main__top_sales__title} ${darkModeClass}`}>
        Хиты продаж
      </h2>
      {isLoading
        ? (
          <ul className={skeletonStyles.skeleton}>
            {Array.from(new Array(20)).map((i, index) => (
              <li
                className={`${skeletonStyles.skeleton__item} ${theme === 'dark' ? `${skeletonStyles.dark_mode}` : ''}`}
                key={index}>
                <div className={skeletonStyles.skeleton__item__light}/>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.main__top_sales__inner}>
            {sofas ? sofaItem.rows.map(i => (
              <CatalogItem  sofa={i} key={i.id}/>
            )) : 'Произошла ошибка при загрузке'}
          </div>
        )}
    </div>
  );
};

