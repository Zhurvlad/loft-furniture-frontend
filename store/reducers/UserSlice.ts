import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {LoginUserResponse, ResponseCreateUser, ResponseLoginUser, ResponseRegisterData} from '../../types/auth';
import {authApi} from '../user/user.api';
import axios from 'axios';


export interface UserState {
  user: ResponseLoginUser | LoginUserResponse | ResponseRegisterData | null
}

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkUser(state:UserState , actions: PayloadAction<LoginUserResponse>){
      state.user = actions.payload
    },
    register(state: UserState, actions: PayloadAction<ResponseRegisterData>){
      state.user = actions.payload
    },
    logOut: () => initialState
  },
  extraReducers: builder => {
    builder
      //@ts-ignore
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state:ResponseLoginUser, action) => {
        //@ts-ignore
        state.user = action.payload
      })
      //@ts-ignore
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state:UserState, action) => {
        //@ts-ignore
        state.user = action.payload
      })
     /* .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = []
      })*/
      .addMatcher(authApi.endpoints.loginCheck.matchFulfilled, (state:UserState, action) => {
        //@ts-ignore
        state.user = action.payload
      })

  },

})

export const {logOut} = userSlice.actions

export const selectUserData = (state: RootState) => state.user

export const user = userSlice.reducer
