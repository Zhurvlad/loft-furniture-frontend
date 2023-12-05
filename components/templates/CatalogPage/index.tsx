import React from 'react';
import {setTimeout} from 'timers';
import {useRouter} from 'next/router';
import ReactPaginate from 'react-paginate';

import {userSlice} from '../../../store/reducers/UserSlice';
import {shoppingCartApi} from '../../../store/shoppingCart/shoppingCart.api';
import {sofasSlice} from '../../../store/reducers/SofasSlice';
import {sofaApi} from '../../../store/sofa/sofa.api';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {Api} from '../../../utils/api/index';
import {sofaColor} from '../../../utils/color';
import {getQueryParamOnFirstRender} from '../../../utils/common';
import {IQueryParams} from '../../../types/catalog';

import {PriceRange} from '../../modules/CatalogPage/PriceRange';
import {FilterSelect} from '../../modules/CatalogPage/FilterSelect';
import {TopSalesItem} from '../../modules/MainPage/TopSalesItem';

import {ColorEl} from '../../elements/ColorEl/index';
import {BrandInput} from '../../elements/BrendInput/index';
import {PrevArrow} from '../../elements/PrevArrow/index';
import {NextArrow} from '../../elements/NextArrow/index';
import {Accordion} from '../../elements/Accordion/index';

import skeletonStyles from '../../../styles/skeletonStyles/index.module.scss';
import spinnerStyles from '../../../styles/spinner/index.module.scss';
import styles from '../../../styles/catalogPage/index.module.scss'

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

  const {data: sofasItem, isLoading,} = sofaApi.useGetSofasQuery({
    limit: 15,
    offset: actualPage,
    sofasParam: router.query.sofas,
    priceFrom: priceQuery[0],
    priceTo: priceQuery[1],
    colorParam: router.query.color
  })

  const checkUser = async () => {
    if (!user?.user) {
      const data = await Api().user.checkUser()
      dispatch(userSlice.actions.checkUser(data))
    }
  }

  React.useEffect(() => {
    checkUser()
  }, [])


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
      }

      if (isValidColorQuery && isValidSofasQuery) {
        setActiveManufacturer(sofasQueryValue)
        setActiveColor(colorQueryValue)
      }

      if (priceFromQueryValue && priceToQueryValue) {
        updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
        return
      }

      if (isValidColorQuery && priceFromQueryValue && priceToQueryValue) {
        setActiveColor(colorQueryValue)
        updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
      }

      if (isValidSofasQuery && priceFromQueryValue && priceToQueryValue) {
        setActiveManufacturer(sofasQueryValue)
        updatePriceFromQuery(+priceFromQueryValue, +priceToQueryValue)
      }


      if (isValidColorQuery) {
        setActiveColor(colorQueryValue)
      }

      if (isValidSofasQuery) {
        setActiveManufacturer(sofasQueryValue)
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

    await router.push({
      query: {
        ...params,
        ...updateParams,
        offset: initialPage + 1
      }
    }, undefined, {shallow: true})

    const data = await Api().sofas.filtersSofa(path)

    dispatch(sofasSlice.actions.setFiltersSofa(data))
  }

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
  }


  React.useEffect(() => {
    loadSofas()
  }, [])

  const loadSofas = async () => {

    const {data} = await Api().sofas.getSofas()

    if (!isValidOffset) {
      await router.replace({
        query: {
          offset: 1
        }
      })
      setCurrentPage(0)
      return
    }

    if (isValidOffset) {

      if (+query.offset > Math.ceil(data?.count / 15)) {
        await router.push({
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

      await router.push({
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
          },
          `${initialPage}${priceQuery}${sofasQuery}${colorQuery}`)
        setPriceQuery([priceFrom, priceTo])
        return
      }

      if (activeManufacturer.length && activeColor.length) {

        await updateParamsAndFilters({
            sofas: encodedSofasBrandQuery,
            color: encodedColorQuery,

          },
          `${initialPage}${sofasQuery}${colorQuery}`)
        return
      }

      if (activeManufacturer.length && isPriceRangeChanged) {

        await updateParamsAndFilters({
            sofas: encodedSofasBrandQuery,
            priceFrom,
            priceTo,

          },
          `${initialPage}${priceQuery}${sofasQuery}`)

        setPriceQuery([priceFrom, priceTo])
        return
      }
      if (isPriceRangeChanged && activeColor.length) {

        await updateParamsAndFilters({
            priceFrom,
            priceTo,
            color: encodedColorQuery,
          },
          `${initialPage}${priceQuery}${colorQuery}`)

        setPriceQuery([priceFrom, priceTo])
        return
      }

      if (activeColor.length) {

        await updateParamsAndFilters({
            color: encodedColorQuery,
          },
          `${initialPage}${colorQuery}`)
        return
      }

      if (activeManufacturer.length) {

        await updateParamsAndFilters({
            sofas: encodedSofasBrandQuery,

          },
          `${initialPage}${colorQuery}`)
        return
      }

      if (isPriceRangeChanged) {
        await updateParamsAndFilters({
            priceFrom,
            priceTo,

          },
          `${initialPage}${priceQuery}`)
        setPriceQuery([priceFrom, priceTo])
        return
      }
      setTimeout(() => {
        setSpinnerShow(false)
      }, 1000)
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        setSpinnerShow(false)
      }, 1000)
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

      await router.push({query: {...params}}, undefined, {shallow: true})


      setCurrentPage(0)
      setActiveManufacturer([])
      setActiveColor([])
      setPriceRange([0, 200000])
      setIsPriceRangeChanged(false)
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        setSpinnerClear(false)
      }, 1000)
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={'container'}>
        <div className={styles.catalog__inner}>
          <div className={styles.filters}>
            <form>
              <ul className={styles.filters__list}>
                <div className={styles.filter__list__inner}>
                  <Accordion arrowClass={styles.open} title={'Цена'}>
                    <li className={styles.filters__list__item}>
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
                      {sofaColor.map(item => (
                        <ColorEl key={item.id} activeColor={activeColor} item={item}
                                 toggleActiveColor={handleActiveColor}/>
                      ))}
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

