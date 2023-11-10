import React from 'react';
import styles from '../../../styles/catalogPage/index.module.scss'
import {useAppSelector} from '../../../hooks/redux';
import {PriceRange} from '../../modules/CatalogPage/PriceRange';
import {CheckboxSvg} from '../../elements/CheckboxSvg/index';
import {ColorEl} from '../../elements/ColorEl/index';
import {BrandInput} from '../../elements/BrendInput/index';
import {FilterSelect} from '../../modules/CatalogPage/FilterSelect';
import {sofaApi} from '../../../store/sofa/sofa.api';
import {TopSalesItem} from '../../modules/MainPage/TopSalesItem';
import {ISofas} from '../../../models/ISofas';
import skeletonStyles from '../../../styles/skeletonStyles/index.module.scss';

const sofaManufacturers = [
  'SCANDICA',
  'DREAMART',
  'ESTA',
  'PUSHE',
  'Rivalli',
  'SOLANA',
  'BRADEX',
  'FINSOFFA'
]

const sofaColor = [
  {id: 1, hex: '#000000', colorName: 'black'},
  {id: 2, hex: '#ffffff', colorName: 'white'},
  {id: 3, hex: '#4ca64c', colorName: 'blue'},
  {id: 4, hex: '#a6a6a6', colorName: 'green'},
  {id: 5, hex: '#e5e5d8', colorName: 'grey'},
  {id: 6, hex: '#800000', colorName: 'ivory'},
  {id: 7, hex: '#808000', colorName: 'maroon'},
  {id: 8, hex: '#ffb732', colorName: 'olive'},
  {id: 9, hex: '#ff3232', colorName: 'orange'},
  {id: 10, hex: '#66e6d9', colorName: 'red'},
  {id: 11, hex: '#ffff4c', colorName: 'turquoise'},
]


//TODO Разобраться со спинером

export const CatalogPage = () => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const {data:sofas, isLoading, error} = sofaApi.useGetSofasQuery(15)

  const sofaItem = sofas  as ISofas

  const [priceRange, setPriceRange] = React.useState([0, 200000])
  const [isPriceRangeChanged, setIsPriceRangeChanged] = React.useState(false)
  const [activeColor, setActiveColor] = React.useState<string[]>([])
  const [activeManufacturer, setActiveManufacturer] = React.useState<string[]>([])

  const handleActiveColor = (color: string) => {
    if (!activeColor.find(i => i === color)) {
      setActiveColor((prev) => ([...prev, color]))
    }
    if (activeColor.find(i => i === color)) {
      const index = activeColor.indexOf(color)
      setActiveColor((prev) => prev.filter((_, i) => i !== index))
    }
  }

  const handleActiveManufacturer = (manufacturer: string) => {
    if (!activeManufacturer.find(i => i === manufacturer)) {
      setActiveManufacturer((prev) => ([...prev, manufacturer]))
    } else {
      const index = activeManufacturer.indexOf(manufacturer)
      setActiveManufacturer((prev) => prev.filter((_, i) => i !== index))
    }

    /* if(activeManufacturer.find(i => i === manufacturer)){

     }*/
  }

  console.log(activeManufacturer)

  return (
    <section className={styles.catalog}>
      <div className={'container'}>
        <div className={styles.catalog__inner}>
          <div className={styles.filters}>
            <form>
              <ul className={styles.filters__list}>
                <li className={styles.filters__list__item}>
                  <p className={`${styles.filter__title} ${darkModeClass}`}>Раздел</p>
                  <div>
                    Тут что то будет
                  </div>
                </li>
                <li className={styles.filters__list__item}>
                  <p className={`${styles.filter__title} ${darkModeClass}`}>Цена</p>
                  <PriceRange
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    setIsPriceChanged={setIsPriceRangeChanged}
                  />
                </li>
                <li className={styles.filters__list__item}>
                  <p className={`${styles.filter__title} ${darkModeClass}`}>Цвета</p>
                  {sofaColor.map(item => (
                    <ColorEl key={item.id} activeColor={activeColor} item={item} toggleActiveColor={handleActiveColor}/>
                  ))}
                  {/*<div className={styles.checkbox}>
                    <input style={{backgroundColor: '#E94848'}} onClick={toggleActiveColor} className={styles.filters__checkbox} type="checkbox"/>
                    {activeColor && <span className={styles.filters__checkbox__span} onClick={toggleActiveColor}><CheckboxSvg/></span>}
                  </div>
                  <div className={styles.checkbox}>
                    <input style={{backgroundColor: '#E94848'}} onClick={toggleActiveColor} className={styles.filters__checkbox} type="checkbox"/>
                    {activeColor && <span className={styles.filters__checkbox__span} onClick={toggleActiveColor}><CheckboxSvg/></span>}
                  </div>*/}

                </li>
                <li className={styles.filters__list__item}>
                  <p className={`${styles.filter__title} ${darkModeClass}`}>Бренд</p>
                  {sofaManufacturers.map(item => (
                    <BrandInput
                      key={item}
                      activeManufacturer={activeManufacturer}
                      handleActiveManufacturer={handleActiveManufacturer}
                      manufacturer={item}/>

                  ))}
                </li>
              </ul>
            </form>
          </div>
          <div className={styles.items}>
            <div className={styles.items__sort}>
              <FilterSelect/>
            </div>
            <div className={styles.items__inner}>
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
                  <div className={styles.items__inner}>
                    {sofas && sofaItem.rows.map(i => (
                      <TopSalesItem sofa={i} key={i.id}/>
                    ))}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

