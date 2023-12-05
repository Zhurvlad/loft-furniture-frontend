
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ISofa} from '../../models/ISofas';

interface SofaState {
  sofa: ISofa

}

const initialState: SofaState = {
  sofa: {} as ISofa
}

export const sofaSlice = createSlice({
  name: 'sofa',
  initialState,
  reducers: {
    getOneSofa(state: SofaState, action: PayloadAction<ISofa>) {
      state.sofa = action.payload

    }
  },
})

export const { getOneSofa } = sofaSlice.actions

export const sofa = sofaSlice.reducer
