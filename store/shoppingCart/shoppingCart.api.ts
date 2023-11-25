import {api} from '../api';
import {UserCartResponse} from '../../types/cart';


export const shoppingCartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserCart : builder.query<UserCartResponse, void>({
      query: ({userId}) => ({
        url: `shopping-cart/${userId}`,
        method: 'GET'
      })
    })
  })
})

export const {useGetUserCartQuery} = shoppingCartApi
