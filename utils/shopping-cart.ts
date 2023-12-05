import axios from 'axios';
import {cartSlice} from '../store/reducers/CartSlice';
import {useDispatch} from 'react-redux';
import {setTimeout} from 'timers';
import {ICartItems} from '../types/cart';
import {Api} from './api/index';
import {toast} from 'react-toastify';

export const toggleCartItem = async (username: string, itemId: number, isInCart: boolean, setSpinner: (arg0: boolean) => void, dispatch) => {


  try {
    if(!username ){
      toast.warning('Пожайлуста авторизуйтесь для того что бы добавить в корзину')
      return
    }

    setSpinner(true)
    if(isInCart){
      return
    }
    const data = await Api().cart.addCartItem(username, itemId)

    dispatch(cartSlice.actions.addToCart(data))

  } catch (e) {
    console.log(e)

  } finally {
    setTimeout(() => {
      setSpinner(false)
    }, 1000)
  }
}


export const calcTotalPrice = (items: ICartItems[]) => {
  return items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)
}
