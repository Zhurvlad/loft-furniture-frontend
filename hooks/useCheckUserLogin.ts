import {Api} from '../utils/api/index';
import {useAppDispatch, useAppSelector} from './redux';
import React, {useRef} from 'react';
import {userSlice} from '../store/reducers/UserSlice';
import {shoppingCartApi} from '../store/shoppingCart/shoppingCart.api';



export const useCheckUserLogin = () => {

/*
  const shouldCheckAuth = useRef(true)

  const checkUser = async () => {
    const data = await Api().user.checkUser()
    dispatch(userSlice.actions.checkUser(data))
  }

  React.useEffect(() => {
    if(shouldCheckAuth.current){
      shouldCheckAuth.current = false
      checkUser()
    }
  }, [])*/


/*
  const {user} = useAppSelector(state => state.user)
  const {data: cartItem} = shoppingCartApi.useGetUserCartQuery({userId: user?.user.userId})*/

}
