import React, {forwardRef} from 'react';
import { AnimatePresence, motion } from 'framer-motion'
import styles from '../../../styles/profileDropDown/index.module.scss';
import {IWrappedComponentProps, withClickOutside} from '../../../utils/withClickOutside';
import {useRouter} from 'next/router';
import {LogoutSvg} from '../../elements/LogoutSvg/index';
import {UserSvg} from '../../elements/UserSvg/index';
import {useAppSelector} from '../../../hooks/redux';
import {useDispatch} from 'react-redux';
import { useLogoutQuery, useRegisterMutation } from '@/store/user/user.api';
import {logOut} from '../../../store/reducers/UserSlice'
import axios from 'axios';



const ProfileDropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(({opened, setOpened}, ref) => {

  const dispatch = useDispatch()
/*  const [log] = useLogoutQuery()*/
  const {theme} = useAppSelector((state) => state.theme)
  const {user} = useAppSelector(state => state.user)

  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const toggleProfileDropDown = () => setOpened(!opened)

  const handleLogout = async () => {
    dispatch(logOut())
/*
    await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`)
*/
  }

  return (
    <>
      <div ref={ref} className={styles.profile}>
        <button onClick={toggleProfileDropDown}>
              <span>
                <UserSvg/>
              </span>
        </button>
        {user && <AnimatePresence>
          {opened &&
          <motion.ul
            initial={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0}}
            className={`${styles.profile__dropdown} ${darkModeClass}`}
            style={{transformOrigin: 'right top'}}
          >
            <li className={styles.profile__dropdown__user}>
              <span className={`${styles.profile__dropdown__username} ${darkModeClass}`}>{user?.user.username}</span>
              <span className={`${styles.profile__dropdown__email} ${darkModeClass}`}>{user?.user.email}</span>
            </li>
            <li className={styles.profile__dropdown__item}>
              <button onClick={handleLogout} className={styles.profile__dropdown__item__btn}>
                <span className={`${styles.profile__dropdown__item__text} ${darkModeClass}`}>Выйти</span>
                <span className={`${styles.profile__dropdown__item__svg} ${darkModeClass}`}>
                <LogoutSvg/>
              </span>
              </button>
            </li>
          </motion.ul>}
        </AnimatePresence>}
      </div>
    </>
  )
})

export default withClickOutside(ProfileDropDown)
