import {api} from '../api';


export const sofaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSofasBestsellers: builder.query({
      query: ({limit, offset}) =>({
        url: `sofas/bestsellers?limit=${limit}&offset=${offset}`,
        /*params: {limit: limit, offset: offset},*/
        method: 'GET',
      })}),
    getSofas: builder.query({
      query : ({limit, offset, sofasParam, priceFrom, priceTo, colorParam}) =>({
        url: `sofas?limit=${limit}&offset=${offset}${sofasParam ? `&sofas=${sofasParam}` : ''}${priceFrom ? priceTo && `&priceFrom=${priceFrom}&priceTo=${priceTo}`: '' }${colorParam ? `&color=${colorParam}` : ''}`,
        method: 'GET',
      })}),
    getOneSofa: builder.query({
      query: ({itemId}) => ({
        url: `sofas/find/${itemId}`,
        method: 'GET'
      })
    })
  })
})


export const {useGetSofasBestsellersQuery, useGetSofasQuery, useGetOneSofaQuery} = sofaApi
