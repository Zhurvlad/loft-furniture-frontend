import React from 'react';
import styles from '../../../styles/catalogPage/index.module.scss'
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
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
import {Accordion} from '../../elements/Accordion/index';
import {sofasSlice} from '../../../store/reducers/SofasSlice';
import Image from 'next/image'
import {getQueryParamOnFirstRender} from '../../../utils/common';
import {shoppingCartApi} from '../../../store/shoppingCart/shoppingCart.api';
import {sofaColor} from '../../../utils/color';
import spinnerStyles from '../../../styles/spinner/index.module.scss';
import {setTimeout} from 'timers';

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



//TODO Разобраться со спинером.
// Подумать над запросом в БД для квери параметров.
// Подумать над запросом в БД при изменении цены.
// Подумать о  запросе всех товаров и уже на фронте их разбивать на порции.



export const CatalogPage = ({query}: { query: IQueryParams }) => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''


  const router = useRouter()
  const dispatch = useAppDispatch()

  const isValidOffset = query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = React.useState(isValidOffset ? +query.offset - 1 : 0)
  const [priceRange, setPriceRange] = React.useState([0, 200000])

  const [activeColor, setActiveColor] = React.useState<string[]>([])


  const [isPriceRangeChanged, setIsPriceRangeChanged] = React.useState(false)

  const [activeManufacturer, setActiveManufacturer] = React.useState<string[]>([])

  const [spinnerShow, setSpinnerShow] = React.useState(false)
  const [spinnerClear, setSpinnerClear] = React.useState(false)
  const loadingItem = spinnerShow ? `${styles.loading}` : ''
  const loadingClear = spinnerClear ? `${styles.loading}` : ''


  const {user} = useAppSelector(state => state.user)
  const {data: cartItem} = shoppingCartApi.useGetUserCartQuery({userId: user?.user.userId})


  /*
    const [queryParam, setQueryParam] = React.useState(false)
  */

  const isAnyActiveColor = activeColor?.length !== 0
  const isAnyActiveManufacturer = activeManufacturer?.length !== 0
  const resetFiltersBtnDisabled = !(isPriceRangeChanged || isAnyActiveColor || isAnyActiveManufacturer)


  //TODO Мб можно этот костыль переделать
  const [priceQuery, setPriceQuery] = React.useState([0, 200000])

  const {sofas} = useAppSelector((state => state.sofas))
  const pagesCount = Math.ceil(sofas.count / 15)
  const priceFrom = priceRange[0]
  const priceTo = priceRange[1]

  const actualPage = currentPage > pagesCount ? setCurrentPage(0) : currentPage

  const {data: sofasItem, isLoading, error, refetch} = sofaApi.useGetSofasQuery({
    limit: 15,
    offset: actualPage,
    sofasParam: router.query.sofas,
    priceFrom: priceQuery[0],
    priceTo: priceQuery[1],
    colorParam: router.query.color
  })

  console.log(isLoading, 999)


  React.useEffect(() => {
    applyFilterFromQuery()
  }, [])

  const applyFilterFromQuery = () => {
    try {
      const priceFromQueryValue = getQueryParamOnFirstRender('priceFrom', router)
      const priceToQueryValue = getQueryParamOnFirstRender('priceTo', router)
      const sofasQueryValue = JSON.parse(decodeURIComponent(getQueryParamOnFirstRender('sofas', router) as string))
      const colorQueryValue = JSON.parse(decodeURIComponent(getQueryParamOnFirstRender('color', router) as string))

      const isValidSofasQuery = Array.isArray(sofasQueryValue) && !!sofasQueryValue?.length
      const isValidColorQuery = Array.isArray(colorQueryValue) && !!colorQueryValue?.length

      const sofasQuery = `&sofas=${getQueryParamOnFirstRender('boiler', router)}`
      const colorQuery = `&color=${getQueryParamOnFirstRender('color', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`

      if (isValidColorQuery && isValidSofasQuery && priceFromQueryValue && priceToQueryValue) {
        setActiveManufacturer(sofasQueryValue)
        setActiveColor(colorQueryValue)

        updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)

        /*setIsPriceRangeChanged(true)
        setPriceRange([+priceFromQueryValue, +priceToQueryValue])
        setPriceQuery([+priceFromQueryValue, +priceToQueryValue])
        return*/
      }

      if (isValidColorQuery && isValidSofasQuery) {
        setActiveManufacturer(sofasQueryValue)
        setActiveColor(colorQueryValue)
        /*setIsPriceRangeChanged(true)*/
      }

      if (priceFromQueryValue && priceToQueryValue) {
        updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)


        /* setIsPriceRangeChanged(true)
         setPriceRange([+priceFromQueryValue, +priceToQueryValue])
         setPriceQuery([+priceFromQueryValue, +priceToQueryValue])*/
        return
      }

      if (isValidColorQuery && priceFromQueryValue && priceToQueryValue) {
        setActiveColor(colorQueryValue)
        updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)


        /*setIsPriceRangeChanged(true)
        setPriceRange([+priceFromQueryValue, +priceToQueryValue])
        setPriceQuery([+priceFromQueryValue, +priceToQueryValue])*/
      }

      if (isValidSofasQuery && priceFromQueryValue && priceToQueryValue) {
        setActiveManufacturer(sofasQueryValue)
        updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
        /* setIsPriceRangeChanged(true)
         setPriceRange([+priceFromQueryValue, +priceToQueryValue])
         setPriceQuery([+priceFromQueryValue, +priceToQueryValue])*/
      }


      if (isValidColorQuery) {
        setActiveColor(colorQueryValue)
        /*setIsPriceRangeChanged(true)*/
      }

      if (isValidSofasQuery) {
        setActiveManufacturer(sofasQueryValue)
        /* setIsPriceRangeChanged(true)*/
      }

    } catch (e) {
      console.log(e)
    }
  }

  const updatePriceFromQuery = (priceFrom: number, priceTo: number) => {
    setIsPriceRangeChanged(true)
    setPriceRange([priceFrom, priceTo])
    setPriceQuery([priceFrom, priceTo])
  }

  async function updateParamsAndFilters<T>(updateParams: T, path: string) {

    const params = router.query

    delete params.sofas
    delete params.color
    delete params.priceFrom
    delete params.priceTo
    params.sortBy = 'cheap'

    const initialPage = currentPage > 0 ? 0 : currentPage

    router.push({
      query: {
        ...params,
        ...updateParams,
        offset: initialPage + 1
      }
    }, undefined, {shallow: true})

    const {data} = await axios.get(`http://localhost:3002/sofas?limit=15&offset=${path}`)

    dispatch(sofasSlice.actions.setFiltersSofa(data))
  }

  /* const sofaItem = sofas  as ISofas*/


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
      window.scrollTo(0, 0)
    } catch (e) {
      console.log(e)
    }
  }

  const applyFilter = async () => {
    try {
      setSpinnerShow(true)

      const priceFrom = priceRange[0]
      const priceTo = priceRange[1]
      const encodedSofasBrandQuery = encodeURIComponent(JSON.stringify(activeManufacturer))
      const encodedColorQuery = encodeURIComponent(JSON.stringify(activeColor))

      const priceQuery = isPriceRangeChanged ? `&priceFrom=${priceFrom}&priceTo=${priceTo}` : ''
      const sofasQuery = `&sofas=${encodedSofasBrandQuery}`
      const colorQuery = `&color=${encodedColorQuery}`

      const initialPage = currentPage > 0 ? 0 : currentPage

      if (activeManufacturer.length && isPriceRangeChanged && activeColor.length) {
        await updateParamsAndFilters({
            sofas: encodedSofasBrandQuery,
            priceFrom,
            priceTo,
            color: encodedColorQuery,
            /*offset: initialPage + 1*/
          },
          `${initialPage}${priceQuery}${sofasQuery}${colorQuery}`)

        /* router.push({
           query: {
             ...router.query,
             sofas: encodedSofasBrandQuery,
             priceFrom,
             priceTo,
             color: encodedColorQuery,
             offset: initialPage + 1

           }
         })

         const {data} = await axios.get(`http://localhost:3002/sofas?limit=15&offset=${initialPage}${priceQuery}${sofasQuery}${colorQuery}`)

         dispatch(sofasSlice.actions.setFiltersSofa(data))*/
        setPriceQuery([priceFrom, priceTo])
        return
      }

      if (activeManufacturer.length && activeColor.length) {

        await updateParamsAndFilters({
            sofas: encodedSofasBrandQuery,
            color: encodedColorQuery,
            /*offset: initialPage + 1*/
          },
          `${initialPage}${sofasQuery}${colorQuery}`)

        /* router.push({
           query: {
             ...router.query,
             sofas: encodedSofasBrandQuery,
             color: encodedColorQuery,
             offset: initialPage + 1
           }
         })

         const {data} = await axios.get(`http://localhost:3002/sofas?limit=15&offset=${initialPage}${sofasQuery}${colorQuery}`)
         dispatch(sofasSlice.actions.setFiltersSofa(data))*/

        return
      }

      if (activeManufacturer.length && isPriceRangeChanged) {

        await updateParamsAndFilters({
            sofas: encodedSofasBrandQuery,
            priceFrom,
            priceTo,
            /*offset: initialPage + 1*/
          },
          `${initialPage}${priceQuery}${sofasQuery}`)

        /*router.push({
          query: {
            ...router.query,
            sofas: encodedSofasBrandQuery,
            priceFrom,
            priceTo,
            offset: initialPage + 1
          }
        })

        const {data} = await axios.get(`http://localhost:3002/sofas?limit=15&offset=${initialPage}${priceQuery}${sofasQuery}`)

        dispatch(sofasSlice.actions.setFiltersSofa(data))*/
        setPriceQuery([priceFrom, priceTo])
        return
      }

      if (isPriceRangeChanged && activeColor.length) {

        await updateParamsAndFilters({
            priceFrom,
            priceTo,
            color: encodedColorQuery,
            /*offset: initialPage + 1*/
          },
          `${initialPage}${priceQuery}${colorQuery}`)

        /* router.push({
           query: {
             ...router.query,
             priceFrom,
             priceTo,
             color: encodedColorQuery,
             offset: initialPage + 1
           }
         })

         const {data} = await axios.get(`http://localhost:3002/sofas?limit=15&offset=${initialPage}${priceQuery}${colorQuery}`)
         dispatch(sofasSlice.actions.setFiltersSofa(data))*/

        setPriceQuery([priceFrom, priceTo])
        return
      }

      if (activeColor.length) {

        await updateParamsAndFilters({
            color: encodedColorQuery,
            /* offset: initialPage + 1*/
          },
          `${initialPage}${colorQuery}`)

        /*router.push({
          query: {
            ...router.query,
            color: encodedColorQuery,
            offset: initialPage + 1
          }
        })

        const {data} = await axios.get(`http://localhost:3002/sofas?limit=15&offset=${initialPage}${colorQuery}`)
        dispatch(sofasSlice.actions.setFiltersSofa(data))*/

        return
      }

      if (activeManufacturer.length) {

        await updateParamsAndFilters({
            sofas: encodedSofasBrandQuery,
            /*offset: initialPage + 1*/
          },
          `${initialPage}${colorQuery}`)

        /* router.push({
           query: {
             ...router.query,
             sofas: encodedSofasBrandQuery,
             offset: initialPage + 1
           }
         })

         const {data} = await axios.get(`http://localhost:3002/sofas?limit=15&offset=${initialPage}${sofasQuery}`)
         dispatch(sofasSlice.actions.setFiltersSofa(data))*/
        return
      }

      if (isPriceRangeChanged) {

        await updateParamsAndFilters({
            priceFrom,
            priceTo,
            /*offset: initialPage + 1*/
          },
          `${initialPage}${priceQuery}`)

        /* router.push({
           query: {
             ...router.query,
             priceFrom,
             priceTo,
             offset: initialPage + 1
           }
         })
         const {data} = await axios.get(`http://localhost:3002/sofas?limit=15&offset=${initialPage}${priceQuery}`)
         dispatch(sofasSlice.actions.setFiltersSofa(data))*/

        setPriceQuery([priceFrom, priceTo])

        return
      }
      setTimeout(() => {setSpinnerShow(false)}, 1000)
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {setSpinnerShow(false)}, 1000)
    }
  }

  const resetFilters = async () => {
    try {
      setSpinnerClear(true)
      const params = router.query

      delete params.sofas
      delete params.color
      delete params.priceFrom
      delete params.priceTo
      params.sortBy = 'cheap'

      router.push({query: {...params}}, undefined, {shallow: true})


      setCurrentPage(0)
      setActiveManufacturer([])
      setActiveColor([])
      setPriceRange([0, 200000])
      setIsPriceRangeChanged(false)
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {setSpinnerClear(false)}, 1000)
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
                <div className={styles.filter__list__inner}>
                  <Accordion arrowClass={styles.open} title={'Цена'}>
                    <li className={styles.filters__list__item}>
                      {/*<p className={`${styles.filter__title} ${darkModeClass}`}>Цена</p>*/}
                      <PriceRange
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        setIsPriceChanged={setIsPriceRangeChanged}
                        allowOverlap={true}
                      />

                    </li>
                  </Accordion>
                </div>
                <div style={{height: 20}}/>
                <div className={styles.filter__list__inner}>
                  <Accordion arrowClass={styles.open} title={'Цвет'}>
                    <li className={styles.filters__list__item}>
                      {/*<p className={`${styles.filter__title} ${darkModeClass}`}>Цвет</p>*/}
                      {sofaColor.map(item => (
                        <ColorEl key={item.id} activeColor={activeColor} item={item}
                                 toggleActiveColor={handleActiveColor}/>
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
                  </Accordion>
                </div>
                <div style={{height: 20}}/>
                <div className={styles.filter__list__inner}>
                  <Accordion arrowClass={styles.open} title={'Бренд'}>
                    <li className={styles.filters__list__item}>
                      {/* <p className={`${styles.filter__title} ${darkModeClass}`}>Бренд</p>*/}
                      {sofaManufacturers.map(item => (
                        <BrandInput
                          key={item}
                          activeManufacturer={activeManufacturer}
                          handleActiveManufacturer={handleActiveManufacturer}
                          manufacturer={item}/>
                      ))}
                    </li>
                  </Accordion>
                </div>
              </ul>
            </form>
            <button
              className={`${styles.filter__clear} ${darkModeClass} ${loadingItem}`}
              disabled={resetFiltersBtnDisabled}
              onClick={applyFilter}
            >
              {spinnerShow ? <span
                style={{top: '9px', left: '45%'}}
                className={spinnerStyles.spinner}
              /> : 'Показать'}

            </button>
            <button
              onClick={resetFilters}
              className={`${styles.filter__clear} ${darkModeClass} ${loadingClear}`}
              disabled={resetFiltersBtnDisabled}>
              {spinnerClear ? <span
                style={{top: '9px', left: '45%'}}
                className={spinnerStyles.spinner}
              /> : 'Сбросить все фильтры'}
            </button>
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
                  <div>
                    {sofas.rows?.length
                      ? <div className={styles.items__inner}>
                        {sofas && sofas.rows?.map(i => (
                          <TopSalesItem sofa={i} sofaColor={sofaColor} key={i.id}/>
                        ))}
                      </div>
                      : <div className={styles.not__found}>
                        <img className={styles.not__found__img} src="/img/notFound1.jpg" alt=""/>
                        <p>По вашему запросу ничего не нашлось</p>
                      </div>
                    }
                  </div>
                )}

            </div>
            {sofas.rows?.length && pagesCount !== 1
              ? <ReactPaginate
                containerClassName={styles.pagination__list}
                pageLinkClassName={`${styles.pagination__list__item} ${darkModeClass}`}
                previousClassName={currentPage !== 0 ? `${styles.pagination__prev}` : `${styles.arrow__disable}`}
                nextLabel={<NextArrow/>}
                previousLabel={<PrevArrow/>}
                nextClassName={pagesCount !== currentPage + 1 ? `${styles.pagination__next}` : `${styles.arrow__disable}`}
                breakLinkClassName={`${styles.pagination__break__link} ${darkModeClass}`}
                breakLabel={'...'}
                pageCount={pagesCount}
                forcePage={currentPage}
                onPageChange={handleChangePage}/>
              : ''}


          </div>
        </div>
      </div>
    </section>
  );
};

