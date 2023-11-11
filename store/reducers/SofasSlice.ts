import {ISofas} from '../../models/ISofas';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {sofaApi} from '../sofa/sofa.api';


interface SofasState {
  sofas: ISofas[],
}

export enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}


const initialState:SofasState = {
  sofas: [],
}


export const sofasSlice = createSlice({
  name: 'sofas',
  initialState,
  reducers: {
    setSofasChipFirst(state){
      state.sofas.rows = state.sofas.rows.sort((a, b) => a.price - b.price)
    },
    setSofasExpensiveFirst(state){
      state.sofas.rows = state.sofas.rows.sort((a, b) => b.price - a.price)
    },
    setSofasPopularity(state) {
      state.sofas.rows = state.sofas.rows.sort((a, b) => b.initialRating - a.initialRating)
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(sofaApi.endpoints.getSofas.matchFulfilled, (state, actions:PayloadAction<ISofas[]>) => {
        state.sofas = actions.payload
      })
  }

})


export const sofasSelector = (state: RootState) => state.sofas

export const { sofasFetchingSuccess } = sofasSlice.actions

export const sofas = sofasSlice.reducer
