import React from 'react';

import {MainSlider} from '../../modules/MainPage/MainSlider';
import {TopSales} from '../../modules/MainPage/TopSales';
import {Category} from '../../modules/MainPage/Category';

import 'react-toastify/dist/ReactToastify.css';
import styles from '../../../styles/mainPage/index.module.scss'

export const MainPage = () => {
  return (
    <section className={styles.main}>
      <div className="container">
        <Category/>
        <div className={styles.main__slider}>
          <MainSlider/>
        </div>
        <TopSales/>
      </div>
    </section>
  );
};

