import React, {forwardRef} from 'react';
import {AnimatePresence, motion} from 'framer-motion'
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';

import {userSlice} from '../../../store/reducers/UserSlice'
import {useAppSelector} from '../../../hooks/redux';
import {IWrappedComponentProps, withClickOutside} from '../../../utils/withClickOutside';
import {ResponseLoginUser} from '../../../types/auth';

import {LogoutSvg} from '../../elements/LogoutSvg/index';
import {UserSvg} from '../../elements/UserSvg/index';

import styles from '../../../styles/profileDropDown/index.module.scss';


const ProfileDropDown = forwardRef<HTMLDivElement, IWrappedComponentProps>(({opened, setOpened}, ref) => {

  const dispatch = useDispatch()

  const {theme} = useAppSelector((state) => state.theme)
  const {user} = useAppSelector(state => state.user)

  const userData = user as ResponseLoginUser

  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const toggleProfileDropDown = () => setOpened(!opened)

  const handleLogout = async () => {
    try {
      dispatch(userSlice.actions.logOut())
      toast.success('Вы успешно вышли из учётной записи')
    } catch (e) {
      toast.warning('Произошла неизвестная ошибка')
    }
  }

  return (
    <>
      <div key={1} ref={ref} className={`${styles.profile} ${darkModeClass}`}>
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
              <span className={`${styles.profile__dropdown__username} ${darkModeClass}`}>{userData.user.username}</span>
              <span className={`${styles.profile__dropdown__email} ${darkModeClass}`}>{userData.user.email}</span>
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
