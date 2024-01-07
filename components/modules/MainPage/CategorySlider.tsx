import React from 'react';

import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import {KitchenSvg} from '../../elements/KitchenSvg/index';
import {BedsSvg} from '../../elements/BedsSvg/index';
import {SofaSvg} from '../../elements/SofaSvg/index';
import {WardrobeSvg} from '../../elements/WardobeSvg/index';
import {OfficeFurnitureSvg} from '../../elements/OfficeFurnitureSvg/index';
import {ChildrenRoomSvg} from '../../elements/ChildrenRoomSvg/index';
import {SalesSvg} from '../../elements/SalesSvg/index';
import styles from '../../../styles/mainPage/index.module.scss';
import Link from 'next/link';
import {useAppSelector} from '../../../hooks/redux';
import {SalesBlackSvg} from '../../elements/SalesBlackSvg/index';

const categoryItem = [
  {id: 1, svg: <KitchenSvg/>, name: 'Кухни', route: '/catalog', class: ''},
  {id: 2, svg: <BedsSvg/>, name: 'Кровати', route: '/catalog', class: ''},
  {id: 3, svg: <SofaSvg/>, name: 'Диваны', route: '/catalog', class: ''},
  {id: 4, svg: <WardrobeSvg/>, name: 'Шкафы', route: '/catalog', class: ''},
  {id: 5, svg: <OfficeFurnitureSvg/>, name: 'Офисная мебель', route: '/catalog', class: ''},
  {id: 6, svg: <ChildrenRoomSvg/>, name: 'Детские', route: '/catalog', class: ''},
  {id: 7, svg: <SalesBlackSvg/>, name: 'Акции', route: '/catalog', class: `${styles.red}`},
]

export const CategorySlider = () => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const settings = {
    dots: false,
    infinite: false,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: false,
    nextArrow: false,
    prevArrow: false
  };

  return (
    <Slider {...settings} >
          {categoryItem.map((i) => (
            <li key={i.id} className={styles.categories__item}>
              <Link href={i.route} legacyBehavior passHref>
                <a className={`${styles.categories__item__link} ${darkModeClass} ${i.class}`}>
                  <span>{i.svg}</span>
                  <p>{i.name}</p>
                </a>
              </Link>
            </li>
          ))}
    </Slider>
  );
};

