import {ICart} from '../../types/cart';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {shoppingCartApi} from '../shoppingCart/shoppingCart.api';


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
    start: ()  => initialState
  },
  extraReducers: builder => {
    builder
      .addMatcher(shoppingCartApi.endpoints.getUserCart.matchFulfilled, (state, actions : PayloadAction<ICart[]>) => {
      state.item = actions.payload
    })
  }
})
