import {Action, combineReducers} from 'redux';
import {configureStore, ThunkAction} from '@reduxjs/toolkit';

import {theme} from './reducers/ThemeSlice';
import {sofas} from './reducers/SofasSlice';
import {user} from './reducers/UserSlice';
import {sofaApi} from './sofa/sofa.api';


const rootReducer = combineReducers({
  theme,
  /*sofas,*/
  [sofaApi.reducerPath]: sofaApi.reducer,
  user
})


export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(sofaApi.middleware),
  })
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>

export type RootStore = ReturnType<typeof setupStore>;


export type AppDispatch = RootStore['dispatch']

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

/*
export const store = configureStore({
  reducer: {
    theme,
    [sofaApi.reducerPath]: sofaApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sofaApi.middleware),
})
*/
