import React from 'react';

import {useMediaQuery} from '../../../hooks/useMediaQuery';

import {MainSliderArrowNext} from '../../elements/MainSliderArrowNext/index';
import {MainSliderArrowPrev} from '../../elements/MainSliderArrowPrev/index';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import styles from '../../../styles/itemPage/index.module.scss';

export const ItemSlider = ({images}: { images: string[] }) => {

  const isMedia1140 = useMediaQuery(1140)
  const isMedia960 = useMediaQuery(960)
  const isMedia768 = useMediaQuery(768)
  const isMedia320 = useMediaQuery(320)

  const isMobile700 = useMediaQuery(700)
  const isMobile530 = useMediaQuery(530)

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: <MainSliderArrowNext/>,
    prevArrow: <MainSliderArrowPrev/>
  };


  return (
    <Slider {...settings} className={styles.item__slider}>
      {images.map((src, i) =>
        <div className={styles.item__slide} key={i} style={{width: 593}}>
          <img src={src} alt={`image-${i + 1}`}/>
        </div>)}
    </Slider>
  );
};

