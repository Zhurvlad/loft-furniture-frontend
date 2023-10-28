import {ResponseCreateUser} from '../../utils/api/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {registerUser} from './AuthActions';


export interface UserState {
  user: ResponseCreateUser | null
}

const initialState: UserState = {
  user: null,
}


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<ResponseCreateUser>) {
      state.user = action.payload
    }
  },
  /*extraReducers: {
    [registerUser.fulfilled]: (state, {payload}) => {
      state.user = payload
    }
  }*/
})

export const {setUserData} = userSlice.actions

export const selectUserData = (state: RootState) => state.user

export const user = userSlice.reducer
