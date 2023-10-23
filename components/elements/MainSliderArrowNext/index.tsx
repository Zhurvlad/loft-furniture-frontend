import React from 'react';
import {MainSliderArrowSvg} from '../MainSliderArrowSvg/index';
import {IMainSliderArrow} from '../../../types/elements';

import styles from '../../../styles/mainPage/index.module.scss'

export const MainSliderArrowNext = (props: IMainSliderArrow) => {
    return (
        <button onClick={props.onClick} className={`${styles.main__slider__arrow} ${styles.main__slider__arrow_next}`} >
            <span>
              <MainSliderArrowSvg/>
            </span>
        </button>
    );
};

