import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {registerUser} from './AuthActions';
import {ResponseCreateUser, ResponseLoginUser} from '../../types/auth';
import {authApi} from '../user/user.api';
import axios from 'axios';


export interface UserState {
  user: ResponseLoginUser | null
}

const initialState: UserState = {
  user: null,
}

/*export const logout = createAsyncThunk("auth/logout", async () => {
  await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`);
});*/

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: () => initialState
  },
  extraReducers: builder => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state:ResponseLoginUser, action) => {
        state.user = action.payload
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state:UserState, action) => {
        state.user = action.payload
      })
     /* .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = []
      })*/
      .addMatcher(authApi.endpoints.loginCheck.matchFulfilled, (state:UserState, action) => {
        state.user = action.payload
      })

  },

})

export const {logOut} = userSlice.actions

export const selectUserData = (state: RootState) => state.user

export const user = userSlice.reducer
