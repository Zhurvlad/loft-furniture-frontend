import {api} from '../api';


export const shoppingCartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserCart : builder.query({
      query: ({userId}) => ({
        url: `shopping-cart/${userId}`,
        method: 'GET'
      })
    })
  })
})

export const {useGetUserCartQuery} = shoppingCartApi
