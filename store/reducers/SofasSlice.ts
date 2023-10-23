import {ISofas} from '../../models/ISofas';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {themeSlice} from './ThemeSlice';
import {RootState} from '../store';
import {fetchSofass} from './ActionCreators';


interface SofasState {
  sofas: ISofas[],
  isLoading: boolean,
  error: string
}

export enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}


const initialState:SofasState = {
  sofas: [],
  isLoading: false,
  error: ''
}


export const sofasSlice = createSlice({
  name: 'sofas',
  initialState,
  reducers: {
    sofasFetching(state){
      state.isLoading = true
    },
    sofasFetchingSuccess(state, action: PayloadAction<ISofas[]>){
      state.isLoading = false
      state.error = ''
      state.sofas = action.payload
    },
    sofasFetchingError(state, action: PayloadAction<string>){
      state.isLoading = false
      state.error = action.payload
    }
  },
  /*extraReducers: {
    [fetchSofass.fulfilled.type]: (state, action: PayloadAction<ISofas[]>) => {
      state.isLoading = false
      state.error = ''
      state.sofas = action.payload
    },
    [fetchSofass.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchSofass.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
  }*/
})


export const sofasSelector = (state: RootState) => state.sofas

export const { sofasFetchingSuccess } = sofasSlice.actions

export const sofas = sofasSlice.reducer
