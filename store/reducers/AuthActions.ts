import {createAsyncThunk} from '@reduxjs/toolkit';
import {CreateUserDto} from '../../utils/api/types';
import axios from 'axios';
import url from '../../utils/api'

//TODO: Можно удалить

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({dto: CreateUserDto}, {rejectWithValue}) => {
    try {
      await axios.post(`${url}/auth/signup`, dto)
    } catch (e) {
      if (e.response && e.response.data.message) {
        return rejectWithValue(e.response.data.message)
      } else {
        return rejectWithValue(e.message)
      }
    }
  }
)
