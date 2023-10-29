import React, {forwardRef} from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import styles from '../../../styles/profileDropDown/index.module.scss';
import {IWrappedComponentProps, withClickOutside} from '../../../utils/withClickOutside';


import {useRouter} from 'next/router';
import {LogoutSvg} from '../../elements/LogoutSvg/index';
import {UserSvg} from '../../elements/UserSvg/index';
import {useAppSelector} from '../../../hooks/redux';
import {sofaApi} from '../../../store/sofa/sofa.api';
import {authApi} from '../../../store/user/user.api';


const ProfileDropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(({opened, setOpened}, ref) => {


  const router = useRouter()

  const {data:user, isLoading, error} = authApi.useLoginMutation()
  const {theme} = useAppSelector((state) => state.theme)

  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const toggleProfileDropDown = () => setOpened(!opened)

  console.log(user && user.user.username)


  return (
    <>
      <div ref={ref} className={styles.profile}>
        <button onClick={toggleProfileDropDown}>
              <span>
                <UserSvg/>
              </span>
        </button>
        <li className={styles.profile__dropdown__user}>
          {/*<span className={`${styles.profile__dropdown__username} ${darkModeClass}`}>{user.username}</span>
          <span className={`${styles.profile__dropdown__email} ${darkModeClass}`}>{user.email}</span>*/}
        </li>
        <li className={styles.profile__dropdown__item}>
          <button className={styles.profile__dropdown__item__btn}>
            <span  className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}>Выйти</span>
            <span className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}>
                <LogoutSvg/>
              </span>
          </button>
        </li>
     {/*   <AnimatePresence>
          {opened &&
          <motion.ul
            initial={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0}}
            className={`${styles.profile__dropdown} ${darkModeClass}`}
            style={{transformOrigin: 'right top'}}
          >
            <li className={styles.profile__dropdown__user}>
              <span className={`${styles.profile__dropdown__username} ${darkModeClass}`}>{user.username}</span>
              <span className={`${styles.profile__dropdown__email} ${darkModeClass}`}>{user.email}</span>
            </li>
            <li className={styles.profile__dropdown__item}>
              <button className={styles.profile__dropdown__item__btn}>
                <span  className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}>Выйти</span>
                <span className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}>
                <LogoutSvg/>
              </span>
              </button>
            </li>
          </motion.ul>}
        </AnimatePresence>*/}
      </div>
    </>
  )
})

export default withClickOutside(ProfileDropDown)
