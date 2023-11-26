import {ICart, ICartItems} from '../../types/cart';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {shoppingCartApi} from '../shoppingCart/shoppingCart.api';
import {RootState} from '../store';
import {calcTotalPrice} from '../../utils/shopping-cart';


interface CartState {
  item: ICart[]
}

const initialState: CartState = {
  item: []
}


export const cartSlice = createSlice({

  name: 'cart',
  initialState,
  reducers: {
    setCartItem(state, actions) {
      state.item = actions.payload
    },
    removeCartItem(state: CartState, actions: PayloadAction<number>) {
      state.item = state.item.filter((i) => i.itemId !== actions.payload)
    },
    addToCart(state: CartState, actions){
      state.item.push(actions.payload)
    },
    plusItem(state: CartState, action: PayloadAction<number>){
      const findItem = state.item.find((i) => i.itemId === action.payload)

      if(findItem){
        findItem.count ++
        findItem.total_price = findItem.price * findItem.count
      }


    },
    minusItem(state: CartState, action: PayloadAction<number>){
      const findItem = state.item.find((i) => i.itemId === action.payload)

      if(findItem){
        findItem.count --
        findItem.total_price = findItem.price * findItem.count
      }


    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(shoppingCartApi.endpoints.getUserCart.matchFulfilled, (state: CartState, actions : PayloadAction<ICart[]>) => {
      state.item = actions.payload
    })
  }
})

export const cartSelector = (state: RootState) => state.cart


export const cart = cartSlice.reducer
