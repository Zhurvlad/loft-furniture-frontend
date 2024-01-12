import React from 'react';
import {useRouter} from 'next/router';
import ReactPaginate from 'react-paginate';
import {toast} from 'react-toastify';

import {sofaApi} from '../../../store/sofa/sofa.api';
import {useAppSelector} from '../../../hooks/redux';
import {useMediaQuery} from '../../../hooks/useMediaQuery';
import {sofaColor} from '../../../utils/color';
import {IQueryParams} from '../../../types/catalog';

import {Filters} from '../../modules/CatalogPage/Filters';
import {FilterSelect} from '../../modules/CatalogPage/FilterSelect';
import {CatalogItem} from '../../modules/MainPage/CatalogItem';

import {PrevArrow} from '../../elements/PrevArrow/index';
import {NextArrow} from '../../elements/NextArrow/index';

import skeletonStyles from '../../../styles/skeletonStyles/index.module.scss';
import styles from '../../../styles/catalogPage/index.module.scss'

export const CatalogPage = ({query}: { query: IQueryParams }) => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const isMedia810 = useMediaQuery(810)
  const isMedia480 = useMediaQuery(480)

  const router = useRouter()

  const [priceQuery, setPriceQuery] = React.useState([0, 200000])

  const isValidOffset = query.offset && !isNaN(+query.offset) && +query.offset > 0
  const [currentPage, setCurrentPage] = React.useState(isValidOffset ? +query.offset - 1 : 0)
  const [loading, setLoading] = React.useState(false)

  const {sofas} = useAppSelector((state => state.sofas))

  const pagesCount = Math.ceil(sofas.count / 15)
  const actualPage = currentPage > pagesCount ? setCurrentPage(0) : currentPage

  const {data: sofasItem, isLoading,} = sofaApi.useGetSofasQuery({
    limit: 15,
    offset: actualPage,
    sofasParam: router.query.sofas,
    priceFrom: priceQuery[0],
    priceTo: priceQuery[1],
    colorParam: router.query.color
  })




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
  }



  const handleChangePage = async ({selected}: { selected: number }) => {

    try {
      await router.push({
        query: {
          ...router.query,
          offset: selected + 1
        }
      }, undefined, {shallow: true})

      setCurrentPage(selected)
      window.scrollTo(0, 0)
    } catch (e) {
      toast.warn('Произошла неизвестная ошибка')
    }
  }

  return (
    <section className={styles.catalog}>
      <div className={'container'}>
        <div className={styles.catalog__inner}>
          <Filters
            query={query}
            handleActiveColor={handleActiveColor}
            handleActiveManufacturer={handleActiveManufacturer}
            activeColor={activeColor}
            activeManufacturer={activeManufacturer}
            setActiveManufacturer={setActiveManufacturer}
            setActiveColor={setActiveColor}
            setPriceQuery={setPriceQuery}
            currentPage={currentPage}
            isValidOffset={isValidOffset}
            setCurrentPage={setCurrentPage}
            setLoading={setLoading}
          />

          <div className={styles.items}>
            {/*<FiltersMobile/>*/}
            {!isMedia810 && <div className={styles.items__sort}>
              <FilterSelect/>
            </div>}
            <div>
              {isLoading || loading
                ? (
                  <ul className={skeletonStyles.skeleton__catalog}>
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
                    {sofas.rows?.length
                      ? <div className={styles.items__inner}>
                        {sofas ? sofas.rows?.map(i => (
                          //@ts-ignore
                          <CatalogItem sofa={i} sofaColor={sofaColor} key={i.id}/>
                        )) : 'Произошла ошибка при загрузке'}
                      </div>
                      : <div className={`${styles.not__found} ${darkModeClass}`}>
                        <img className={styles.not__found__img} src="/img/notFound1.jpg" alt=""/>
                        <p>По вашему запросу ничего не нашлось.</p>
                        <p>Попробуйте изменить критерии поиска.</p>
                      </div>
                    }
                  </div>
                )}

            </div>
            {sofas ? sofas.rows?.length && pagesCount !== 1
              ? <ReactPaginate
                containerClassName={styles.pagination__list}
                pageLinkClassName={`${styles.pagination__list__item} ${darkModeClass}`}
                previousClassName={currentPage !== 0 ? `${styles.pagination__prev}` : `${styles.arrow__disable}`}
                nextLabel={!isMedia480 && <NextArrow/>}
                previousLabel={!isMedia480 && <PrevArrow/>}
                nextClassName={pagesCount !== currentPage + 1 ? `${styles.pagination__next}` : `${styles.arrow__disable}`}
                breakLinkClassName={`${styles.pagination__break__link} ${darkModeClass}`}
                breakLabel={'...'}
                pageCount={pagesCount}
                forcePage={currentPage}
                onPageChange={handleChangePage}/>
              : '' : ''}
          </div>
        </div>
      </div>
    </section>
  );
};

