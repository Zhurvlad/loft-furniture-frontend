import React from 'react';

import {useMediaQuery} from '../../../hooks/useMediaQuery';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {MainSliderArrowNext} from '../../elements/MainSliderArrowNext/index';
import {MainSliderArrowPrev} from '../../elements/MainSliderArrowPrev/index';

import styles from '../../../styles/mainPage/index.module.scss'

const mainSlider = [
  {id: 1, img: 'img/main-slider-1.png', alt: 'main-slider-1'},
  {id: 2, img: 'img/main-slider-1.png', alt: 'main-slider-2'},
  {id: 3, img: 'img/main-slider-1.png', alt: 'main-slider-3'},
]

export const MainSlider = () => {

  const isMedia1140 = useMediaQuery(1140)
  const isMedia960 = useMediaQuery(960)
  const isMedia768 = useMediaQuery(768)
  const isMedia320 = useMediaQuery(320)


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
    <Slider {...settings}>
      {mainSlider.map(i => (
        <div
          className={styles.main__slider}
          key={i.id}
          style={{width: isMedia320 ? 320 : isMedia768 ? 768 : isMedia960 ? 960 : 1140}}
        >
          <img src={i.img} alt={i.alt}/>
        </div>
      ))}
    </Slider>
  );
};

