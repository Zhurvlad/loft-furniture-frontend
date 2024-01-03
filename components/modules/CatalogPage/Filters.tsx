import React from 'react';
import {toast} from 'react-toastify';
import {setTimeout} from "timers";
import {useRouter} from 'next/router';

import {sofasSlice} from '../../../store/reducers/SofasSlice';
import {shoppingCartApi} from '../../../store/shoppingCart/shoppingCart.api';
import {userSlice} from '../../../store/reducers/UserSlice';

import {useAppDispatch, useAppSelector} from '../../../hooks/redux';

import {sofaColor} from '../../../utils/color';
import {Api} from '../../../utils/api/index';
import {getQueryParamOnFirstRender} from '../../../utils/common';

import {IQueryParams} from '../../../types/catalog';

import {PriceRange} from './PriceRange';
import {ColorEl} from '../../elements/ColorEl/index';
import {BrandInput} from '../../elements/BrendInput/index';
import {Accordion} from '../../elements/Accordion/index';

import spinnerStyles from '../../../styles/spinner/index.module.scss';
import styles from '../../../styles/catalogPage/index.module.scss';

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

export interface FiltersProps {
  handleActiveColor: (color: string) => void,
  handleActiveManufacturer : (manufacturer: string) => void,
  activeColor: string[],
  activeManufacturer: string[],
  setActiveManufacturer: (manufacturer: string[]) => void,
  setActiveColor: (color: string[]) => void,
  setPriceQuery: (item: number[]) => void,
  currentPage: number,
  isValidOffset: boolean | string,
  setCurrentPage: (obj: number) => void,
  setLoading: (arg: boolean) => void,
  query: IQueryParams
}

export const Filters:React.FC<FiltersProps> = ({handleActiveColor, handleActiveManufacturer,
                                                 activeColor, query, activeManufacturer,
                                                 setActiveManufacturer, setActiveColor, setPriceQuery, currentPage,
                                                 isValidOffset, setCurrentPage, setLoading}) => {



  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''


  const router = useRouter()
  const dispatch = useAppDispatch()

  const [priceRange, setPriceRange] = React.useState([0, 200000])

  const [isPriceRangeChanged, setIsPriceRangeChanged] = React.useState(false)



  const [spinnerShow, setSpinnerShow] = React.useState(false)
  const [spinnerClear, setSpinnerClear] = React.useState(false)
  const loadingItem = spinnerShow ? `${styles.loading}` : ''
  const loadingClear = spinnerClear ? `${styles.loading}` : ''


  const {user} = useAppSelector(state => state.user)
  //@ts-ignore
  const {data: cartItem} = shoppingCartApi.useGetUserCartQuery({userId: user?.user?.userId})


  const isAnyActiveColor = activeColor?.length !== 0
  const isAnyActiveManufacturer = activeManufacturer?.length !== 0
  const resetFiltersBtnDisabled = !(isPriceRangeChanged || isAnyActiveColor || isAnyActiveManufacturer)

  const checkUser = async () => {
    //@ts-ignore
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

      /*const sofasQuery = `&sofas=${getQueryParamOnFirstRender('sofas', router)}`
      const colorQuery = `&color=${getQueryParamOnFirstRender('color', router)}`
      const priceQuery = `&priceFrom=${priceFromQueryValue}&priceTo=${priceToQueryValue}`*/

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
      toast.error('Произошла неизвестная ошибка')
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

  React.useEffect(() => {
    loadSofas()
  }, [])

  const loadSofas = async () => {

  //@ts-ignore
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


  const applyFilter = async () => {
    try {
      setSpinnerShow(true)
      setLoading(true)

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
          `${initialPage}${sofasQuery}`)
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
        setLoading(false)
      }, 1000)
    } catch (e) {
      toast.error('Произошла неизвестная ошибка')
    } finally {
      setTimeout(() => {
        setSpinnerShow(false)
        setLoading(false)
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
                    //@ts-ignore
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
    );
};

