import {ISofas} from '../../models/ISofas';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {sofaApi} from '../sofa/sofa.api';
import {number} from 'prop-types';


interface SofasState {
  sofas: ISofas,
}

const initialState:SofasState = {
  sofas: {} as ISofas,
}


export const sofasSlice = createSlice({
  name: 'sofas',
  initialState,
  reducers: {
    setSofasChipFirst(state: SofasState){
      state.sofas.rows = state.sofas.rows.sort((a, b) => a.price - b.price)
    },
    setSofasExpensiveFirst(state: SofasState){
      state.sofas.rows = state.sofas.rows.sort((a, b) => b.price - a.price)
    },
    setSofasPopularity(state: SofasState) {
      state.sofas.rows = state.sofas.rows.sort((a, b) => b.initialRating - a.initialRating)
    },
    setFiltersSofa(state: SofasState, actions:PayloadAction<ISofas>){
      state.sofas = actions.payload
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(sofaApi.endpoints.getSofas.matchFulfilled, (state:SofasState, actions:PayloadAction<ISofas>) => {
        state.sofas = actions.payload
      })
     /* .addMatcher(sofaApi.endpoints.getOneSofa.matchFulfilled, (state, actions: PayloadAction<ISofas>) => {

      })*/
  }

})


export const sofasSelector = (state: RootState) => state.sofas

export const { sofasFetchingSuccess } = sofasSlice.actions

export const sofas = sofasSlice.reducer
