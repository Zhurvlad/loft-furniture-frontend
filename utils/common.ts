import {NextRouter} from 'next/router';
import {document} from 'postcss';

export const getWindowWidth = () => {
  const {innerWidth: windowWidth} =
    typeof window !== 'undefined' ? window : {innerWidth: 0}

  return {windowWidth}
}


export const formatPrice = (x: number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const createSelectOption = (value: string | number) => ({
  value,
  label: value
})


export const getQueryParamOnFirstRender = (queryName: string, router: NextRouter) =>
  router.query[queryName] || router.asPath.match(new RegExp(`[&?]${queryName}=(.*)(&|$)`))


export const toggleClassNamesForOverlayAndBody = (overlayClassName = 'open') => {
  document.querySelector('.overlay')?.classList.toggle(overlayClassName)
  document.querySelector('.body')?.classList.toggle('overflow-hidden')
}

export const removeClassNamesForOverlayAndBody = (overlayClassName = 'open') => {
  document.querySelector('.overlay')?.classList.remove(overlayClassName)
  document.querySelector('.body')?.classList.remove('overflow-hidden')
}

