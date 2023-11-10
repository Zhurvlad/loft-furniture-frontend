import {AppDispatch} from '../store';
import axios from 'axios';
import {ISofas} from '../../models/ISofas';
import {sofasSlice} from './SofasSlice';
import {createAsyncThunk} from '@reduxjs/toolkit';

//TODO: Можно удалить

export const fetchSofas = async (dispatch: AppDispatch) => {
    try {
      dispatch(sofasSlice.actions.sofasFetching())
      const {data} = await axios.get<ISofas[]>('http://localhost:3002/sofas/bestsellers?limit=20&offset=0')
      dispatch(sofasSlice.actions.sofasFetchingSuccess(data))
    } catch (e) {
      dispatch(sofasSlice.actions.sofasFetchingError(e.message))
    }
}

/*
export const fetchSofass = createAsyncThunk(
  'sofas/fetchAll',
  async (_, thunkApi) => {
    try {
      const {data} = await axios.get<ISofas[]>('http://localhost:3002/sofas/bestsellers?limit=20&offset=0')
      return data
    } catch (e) {
      return thunkApi.rejectWithValue('Произошла ошибка')
    }
  }
)
*/
