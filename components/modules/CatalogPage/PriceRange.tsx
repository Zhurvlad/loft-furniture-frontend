import React from 'react';
import styles from '../../../styles/catalogPage/index.module.scss'
import {getTrackBackground, Range} from 'react-range';
import {useAppSelector} from '../../../hooks/redux';
import {IPriceRAnge} from '../../../types/catalog';

const STEP = 1
const MIN = 0
const MAX = 200000

export const PriceRange:React.FC<IPriceRAnge> = ({priceRange, setPriceRange, setIsPriceChanged}) => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const handlePriceRAngeChange = (priceValue: number[]) => {
    setIsPriceChanged(true)
    setPriceRange(priceValue)
  }

    return (
        <div className={styles.filters__price}>
          <Range
            values={priceRange}
            step={STEP}
            min={MIN}
            max={MAX}
            onChange={handlePriceRAngeChange}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                style={{
                  ...props.style,
                  height: "14px",
                  display: "flex",
                  width: "223px",
                  padding: "0 10px"
                }}
              >
                <div
                  ref={props.ref}
                  style={{
                    height: "5px",
                    width: "100%",
                    borderRadius: "3px",
                    background: getTrackBackground({
                      values: priceRange,
                      colors: ["#ececec", "#245462", "#ececec"],
                      min: MIN,
                      max: MAX
                    }),
                    alignSelf: "center"
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({props}) => (
              <div
                {...props}
                style={{
                  ...props.style,
                }}
              >
                <div
                  style={{
                    height: '14px',
                    width: '14px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '2px solid #1C629E',
                    /*boxShadow: '0px 12px 8px -6px rgba(174, 181, 239, 0.2)',*/
                  }}
                />
              </div>
            )}
          />
          <div className={styles.filters__price__inputs}>
            <input value={`${Math.ceil(priceRange[0])} ₽`} placeholder={'От 0'} type="text"/>
            <span className={`${styles.filters__price__inputs__border} ${darkModeClass}`}/>
            <input value={`${Math.ceil(priceRange[1])} ₽`} placeholder={'До 200000'} type="text"/>
          </div>
        </div>
    );
};

