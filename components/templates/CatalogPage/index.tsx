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
import {PrevArrow} from '../../elements/PrevArrow/index';
import {NextArrow} from '../../elements/NextArrow/index';

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
  {id: 1, hex: '#000000', colorName: 'black', colorNameRu: 'Черный'},
  {id: 2, hex: '#fafafa', colorName: 'white', colorNameRu: 'Белый'},
  {id: 3, hex: '#6ECFFF', colorName: 'blue', colorNameRu: 'Голубой'},
  {id: 4, hex: '#008000', colorName: 'green', colorNameRu: 'Зелёный'},
  {id: 5, hex: '#cccccc', colorName: 'grey', colorNameRu: 'Серый'},
  {id: 6, hex: '#FFFDD0', colorName: 'ivory', colorNameRu: 'Кремовый'},
  {id: 7, hex: '#800020', colorName: 'maroon', colorNameRu: 'Бордовый'},
  {id: 8, hex: '#808000', colorName: 'olive', colorNameRu: 'Оливковый'},
  {id: 9, hex: '#FFA500', colorName: 'orange', colorNameRu: 'Оранжевый'},
  {id: 10, hex: '#F00', colorName: 'red', colorNameRu: 'Красный'},
  {id: 11, hex: '#40E0D0', colorName: 'turquoise', colorNameRu: 'Бирюзовый'},
]


//TODO Разобраться со спинером. Подумать над тем что бы дизейблить стрелки пагинации. Подумать над запросом в БД для квери параметров

export const CatalogPage = ({query}: { query: IQueryParams }) => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''
  const router = useRouter()

  const isValidOffset = query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = React.useState(isValidOffset ? +query.offset - 1 : 0)


  const {data: sofasItem, isLoading, error, refetch} = sofaApi.useGetSofasQuery({limit: 15, offset: currentPage})
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

    if (!isValidOffset) {
      router.replace({
        query: {
          offset: 1
        }
      })
      setCurrentPage(0)
      return
    }

    if (isValidOffset) {

      if (+query.offset > Math.ceil(data.count / 15)) {
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

  const handleChangePage = async ({selected}: { selected: number }) => {

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
      }, undefined, {shallow: true})

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
                  <p className={`${styles.filter__title} ${darkModeClass}`}>Цвет</p>
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
              nextLabel={<NextArrow/>}
              previousLabel={<PrevArrow/>}
              nextClassName={styles.pagination__next}
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
