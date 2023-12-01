import {createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosInstance} from 'axios';
import {IMakePayment} from '../../types/order';
import {ResponseAddToCart, ResponseMakePayment} from './types';


/*export const makePayment = createAsyncThunk*/

export const CartApi = (instance: AxiosInstance) => (
  {
    async updateTotalPrice(  cartItemId: number, total_price: number) {
      await instance.patch<{total_price: number}>(`/shopping-cart/total-price/${cartItemId}`,{total_price: total_price})

    },

    async updateTotalCount(cartItemId: number, count: number) {
     await instance.patch<{count: number}>(`/shopping-cart/count/${cartItemId}`,{count: count})

    },

    async removeCartItem (itemId: number){
      await instance.delete<number>(`/shopping-cart/one/${itemId}`)
    },

    async addCartItem (username: string, itemId: number) : Promise<ResponseAddToCart> {

      const {data} = await instance.post<{username: string, itemId: number}, {data: ResponseAddToCart}>(`/shopping-cart/add`, {username, itemId})

      return data
    }
  }
)
