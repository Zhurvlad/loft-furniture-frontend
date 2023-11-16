import * as React from "react";
import {useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {IAccordion} from '../../../types/common';
import styles from '../../../styles/catalogPage/index.module.scss';
import {useAppSelector} from '../../../hooks/redux';
import {AccordionArrow} from '../AccordionArrow/index';


export const Accordion: React.FC<IAccordion> = ({children, title, arrowClass}) => {

  const [expanded, setExpanded] = React.useState(false)

  const toggleOpenAccordion = () => setExpanded(!expanded)
  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''
  const arrowRotate = expanded ? `${styles.arrow__expanded}` : ''

  return (
    <>
      <motion.div
        initial={false}
        onClick={toggleOpenAccordion}
        className={`${styles.filter__title} ${expanded ? arrowClass : ''} ${darkModeClass}`}>
        <p className={`${styles.filter__title} ${darkModeClass}`}>{title} <span className={`${styles.filter__title__arrow} ${arrowRotate} ${darkModeClass}`}><AccordionArrow/></span></p>

      </motion.div>
      <AnimatePresence initial={false}>
        {expanded && (
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




