import React from 'react';
import Link from 'next/link';

import {useAppSelector} from '../../../hooks/redux';

import {KitchenSvg} from '../../elements/KitchenSvg/index';
import {BedsSvg} from '../../elements/BedsSvg/index';
import {SofaSvg} from '../../elements/SofaSvg/index';
import {WardrobeSvg} from '../../elements/WardobeSvg/index';
import {OfficeFurnitureSvg} from '../../elements/OfficeFurnitureSvg/index';
import {ChildrenRoomSvg} from '../../elements/ChildrenRoomSvg/index';

import styles from '../../../styles/mainPage/index.module.scss';
import {useMediaQuery} from '../../../hooks/useMediaQuery';
import {SalesSvg} from '../../elements/SalesSvg/index';

const categoryItem = [
  {id: 1, svg: <KitchenSvg/>, name: 'Кухни', route: '/catalog'},
  {id: 2, svg: <BedsSvg/>, name: 'Кровати', route: '/catalog'},
  {id: 3, svg: <SofaSvg/>, name: 'Диваны', route: '/catalog'},
  {id: 4, svg: <WardrobeSvg/>, name: 'Шкафы', route: '/catalog'},
  {id: 5, svg: <OfficeFurnitureSvg/>, name: 'Офисная мебель', route: '/catalog'},
  {id: 6, svg: <ChildrenRoomSvg/>, name: 'Детские', route: '/catalog'},
  {id: 7, svg: <SalesSvg/>, name: 'Акции', route: '/catalog'},
]

const categoryItemMedia = [
  {id: 1, svg: <KitchenSvg/>, name: 'Кухни', route: '/catalog'},
  {id: 2, svg: <BedsSvg/>, name: 'Кровати', route: '/catalog'},
  {id: 3, svg: <SofaSvg/>, name: 'Диваны', route: '/catalog'},
  {id: 4, svg: <WardrobeSvg/>, name: 'Шкафы', route: '/catalog'},
  {id: 5, svg: <OfficeFurnitureSvg/>, name: 'Офисная мебель', route: '/catalog'},
  {id: 6, svg: <ChildrenRoomSvg/>, name: 'Детские', route: '/catalog'},
  {id: 7, svg: <SalesSvg/>, name: 'Акции', route: '/catalog'},
]


export const Category = () => {

  const isMedia960 = useMediaQuery(960)
  const isMedia768 = useMediaQuery(768)

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <div className={styles.categories}>
      <ul className={styles.categories__inner}>
        {(isMedia960 ? categoryItemMedia :categoryItem).map((i) => (
          <li key={i.id} className={styles.categories__item}>
            <Link href={i.route} legacyBehavior passHref>
              <a className={`${styles.categories__item__link} ${darkModeClass}`}>
                  <span>{i.svg}</span>
                <p>{i.name}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

