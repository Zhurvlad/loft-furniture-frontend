import React from 'react';

import {citySlice} from '../../../store/reducers/CitySlice';

import {useAppDispatch, useAppSelector} from '../../../hooks/redux';

import {Api} from '../../../utils/api/index';

import {GeolocationPosition, GeolocationPositionError} from '../../modules/Header/HeaderTop';
import {LocationSvg} from '../LocationSvg/index';

import spinnerStyles from '../../../styles/spinner/index.module.scss';
import styles from '../../../styles/header/index.module.scss';

export interface CityButtonProps {
  darkModeClass: string
}

export const CityButton:React.FC<CityButtonProps> = ({darkModeClass} ) => {

  const {city} = useAppSelector(state => state.city)

  const [spinner, setSpinner] = React.useState(false)

  const dispatch = useAppDispatch()

  const getCity = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 0
    }

    const success = async (pos: GeolocationPosition) => {
      try {
        setSpinner(true)
        const {longitude, latitude} = pos.coords

        const data = await Api().location.getLocation({longitude, latitude})

        dispatch(citySlice.actions.setCity({
            city: data.features[0].properties.city,
            //@ts-ignore
            street: data.features[0].properties.address_line1,
          })
        )

      } catch (e) {
        console.log(e)
      } finally {
        setSpinner(false)
      }
    }

    const error = (error: GeolocationPositionError) => console.log(error)
    navigator.geolocation.getCurrentPosition(success, error, options)
  }

    return (
      <button onClick={getCity} className={`${styles.city} ${darkModeClass}`}>
                <span>
                      <LocationSvg/>
                </span>
        <span className={`${styles.city__text} ${darkModeClass}`}>
        {spinner ? (
          <span
            className={spinnerStyles.spinner}
            style={{top: '-2px', left: 10, width: 20, height: 20}}
          />
        ) : city.city?.length ? (
          city.city
        ) : (
          'Город'
        )}
      </span>
      </button>
    );
};

