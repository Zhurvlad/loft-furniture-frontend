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
import ReactPaginate from 'react-paginate';
import skeletonStyles from '../../../styles/skeletonStyles/index.module.scss';
import {IQueryParams} from '../../../types/catalog';
import {useRouter} from 'next/router';
import axios from 'axios';

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


//TODO Разобраться со спинером. Подумать над тем что бы дизейблить стрелки пагинации. Подумать над запросом в БД для квери параметров

export const CatalogPage = ({query}: {query: IQueryParams}) => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()

  const isValidOffset = query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = React.useState(isValidOffset ? +query.offset - 1 : 0)


  const {data: sofasItem, isLoading, error, refetch} = sofaApi.useGetSofasQuery({limit :15, offset: currentPage })
  const {sofas} = useAppSelector((state => state.sofas))
  const pagesCount = Math.ceil(sofas.count / 15)
  /* const sofaItem = sofas  as ISofas*/

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



  React.useEffect(() => {
    loadSofas()

  }, [])

  const loadSofas = async () => {

    const {data} = await axios.get(`http://localhost:3002/sofas?limit=20&offset=1`)

    if(!isValidOffset){
      router.replace({
        query: {
          offset: 1
        }
      })
      setCurrentPage(0)
      return
    }

    if(isValidOffset){

      if(+query.offset > Math.ceil(data.count / 15)){
        router.push({
          query: {
            ...query,
            offset: 1
          }
        }, undefined, {shallow: true})
        setCurrentPage(0)
      }
      return
    }

    const offset = +query.offset - 1
    setCurrentPage(offset)
  }

 /* console.log(pagesCount, 989)
  console.log(currentPage, 878)*/

  const handleChangePage = async ({selected} : {selected: number}) => {

   try {
     //TODO Разобраться что тут за Х
     /*console.log(selected)
     const {data} = await axios.get(`http://localhost:3002/sofas?limit=15&offset=0`)
     if(selected > pagesCount){
       setCurrentPage(0)
       return
     }

     if(isValidOffset && +query.offset > Math.ceil(data.count / 15)){
       setCurrentPage(0)
       return
     }*/

     router.push({
       query: {
         ...router.query,
         offset: selected + 1
       }
     }, undefined, {shallow:true})

     setCurrentPage(selected)
   } catch (e) {
     console.log(e)
   }
  }



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
                    {sofas && sofas.rows?.map(i => (
                      <TopSalesItem sofa={i} key={i.id}/>
                    ))}
                  </div>
                )}
            </div>
            <ReactPaginate
              containerClassName={styles.pagination__list}
              pageLinkClassName={`${styles.pagination__list__item} ${darkModeClass}`}
              previousClassName={styles.pagination__prev}
              nextLabel={
                <svg width="23" height="10" viewBox="0 0 23 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M18.323 9.59624L22.4596 5.45967C22.7135 5.20583 22.7135 4.79427 22.4596 4.54043L18.323 0.403852C18.0692 0.150011 17.6576 0.150011 17.4038 0.403852C17.15 0.657693 17.15 1.06925 17.4038 1.32309L20.4308 4.35005L0 4.35005L0 5.65005L20.4308 5.65005L17.4038 8.677C17.15 8.93084 17.15 9.3424 17.4038 9.59624C17.6576 9.85008 18.0692 9.85008 18.323 9.59624Z"
                        fill='#359740'/>
                </svg>
              }
              previousLabel={
                <svg width="23" height="10" viewBox="0 0 23 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M4.32734 0.190381L0.190771 4.32695C-0.0630703 4.5808 -0.0630703 4.99235 0.190771 5.24619L4.32734 9.38277C4.58119 9.63661 4.99274 9.63661 5.24658 9.38277C5.50043 9.12893 5.50043 8.71737 5.24658 8.46353L2.21963 5.43657L22.6504 5.43657V4.13657L2.21963 4.13657L5.24658 1.10962C5.50043 0.855779 5.50043 0.444221 5.24658 0.190381C4.99274 -0.0634602 4.58119 -0.0634602 4.32734 0.190381Z"
                        fill='#359740'/>
                </svg>
              }
              nextClassName={styles.pagination__next}
              breakClassName={styles.pagination__break}
              breakLinkClassName={`${styles.pagination__break__link} ${darkModeClass}`}
              breakLabel={'...'}
              pageCount={pagesCount}
              forcePage={currentPage}
              onPageChange={handleChangePage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

