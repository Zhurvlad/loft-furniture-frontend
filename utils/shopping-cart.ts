import axios from 'axios';
import {cartSlice} from '../store/reducers/CartSlice';
import {useDispatch} from 'react-redux';
import {setTimeout} from 'timers';
import {ICartItems} from '../types/cart';

export const toggleCartItem = async (username: string, itemId: number, isInCart: boolean, setSpinner: (arg0: boolean) => void, dispatch) => {


  try {
    setSpinner(true)

    if(isInCart){
      return
    }

    const {data} = await axios.post(`http://localhost:3002/shopping-cart/add`, {username, itemId})



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
