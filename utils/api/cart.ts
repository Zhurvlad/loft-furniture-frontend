import  {AxiosInstance} from 'axios';
import {PromiseSearchSofa, ResponseAddToCart, ResponseSearchSofa} from './types';


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

    async removeAllCartItem (userId: number){
      await instance.delete<number>(`/shopping-cart/all/${userId}`)
    },

    async addCartItem (username: string, itemId: number) : Promise<ResponseAddToCart> {

      const {data} = await instance.post<{username: string, itemId: number}, {data: ResponseAddToCart}>(`/shopping-cart/add`, {username, itemId})

      return data
    },


  }
)
