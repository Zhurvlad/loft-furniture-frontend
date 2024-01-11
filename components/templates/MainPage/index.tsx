import React from 'react';

import {MainSlider} from '../../modules/MainPage/MainSlider';
import {TopSales} from '../../modules/MainPage/TopSales';
import {Category} from '../../modules/MainPage/Category';

import 'react-toastify/dist/ReactToastify.css';
import styles from '../../../styles/mainPage/index.module.scss'
import {CategorySlider} from '../../modules/MainPage/CategorySlider';
import {useMediaQuery} from '../../../hooks/useMediaQuery';

export const MainPage = () => {

  const isMedia460 = useMediaQuery(460)
  const isMedia768= useMediaQuery(768)

  return (
    <section className={styles.main}>
      <div className="container">
        {!isMedia768 ?<Category/> : ''}
        {/*<CategorySlider/>*/}
        <div className={styles.main__slider}>
          {!isMedia768 ?<MainSlider/> : <img src="/img/main-slider-1.png" alt=""/>}
        </div>
        <TopSales/>
      </div>
    </section>
  );
};

