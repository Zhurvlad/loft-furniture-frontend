import * as React from "react";
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {IAccordion} from '../../../types/common';
import styles from '../../../styles/catalogPage/index.module.scss';
import {useAppSelector} from '../../../hooks/redux';
import {AccordionArrow} from '../AccordionArrow/index';
import {ArrowBack} from '../ArrowBack/index';


export const Accordion: React.FC<IAccordion> = ({children, title, arrowClass, toggleCartContinue,  cartTotalCount, inCart, cartContinue}) => {

  const [expanded, setExpanded] = React.useState(false)

  const toggleOpenAccordion = () => {
    if(!inCart){
      setExpanded(!expanded)
    } else {
      toggleCartContinue()
    }
  }

  console.log(expanded)


  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''
  const arrowRotate = expanded ? `${styles.arrow__expanded}` : ''
  const edit = inCart ? `${styles.in_cart}` : ''

  return (
    <>
      <motion.div
        initial={false}
        onClick={!inCart ? toggleOpenAccordion : null}
        className={`${styles.filter__title__arrow__class} ${expanded ? arrowClass : ''} ${darkModeClass} ${edit}`}>
        <p className={`${styles.filter__title} ${darkModeClass} ${inCart && styles.cart}`}>{title}
        <span>{cartTotalCount}</span>
          {!inCart ? <span className={`${styles.filter__title__arrow} ${arrowRotate} ${darkModeClass}`}><AccordionArrow/></span> :  !cartContinue ? <span onClick={inCart ? toggleOpenAccordion : null} className={`${styles.filter__title__arrow}`}><ArrowBack/> Редактировать</span> : ''}
        </p>

      </motion.div>
      <AnimatePresence initial={false}>
        {(cartContinue || expanded) && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: {opacity: 1, height: "auto"},
              collapsed: {opacity: 0, height: 0}
            }}
            styles={{overflow: 'hidden'}}
            transition={{duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98]}}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};




