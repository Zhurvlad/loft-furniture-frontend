import {Action, combineReducers} from 'redux';
import {configureStore, ThunkAction} from '@reduxjs/toolkit';

import {theme} from './reducers/ThemeSlice';
import {sofas} from './reducers/SofasSlice';
import {user} from './reducers/UserSlice';
import {cart} from './reducers/CartSlice';
import {api} from './api';
import {city} from './reducers/CitySlice';
import {sofa} from './reducers/SofaSlice';


const rootReducer = combineReducers({
  theme,
  user,
  sofas,
  cart,
  city,
  sofa,
  [api.reducerPath]: api.reducer,
})


export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  })
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>

export type RootStore = ReturnType<typeof setupStore>;


export type AppDispatch = RootStore['dispatch']

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;


