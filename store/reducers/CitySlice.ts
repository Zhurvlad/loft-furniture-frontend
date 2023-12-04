


import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface CityState {
  city: {
    city: string,
    address: string
  },

}

const initialState: CityState = {
  city: {
    address: '',
    city: ''
  },

}

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity(state: CityState, action: PayloadAction<{ city: string, address: string }>) {
      state.city = action.payload

    }
  },
})

export const { setCity } = citySlice.actions

export const city = citySlice.reducer
