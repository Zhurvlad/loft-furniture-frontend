import {Action, combineReducers} from 'redux';
import {configureStore, ThunkAction} from '@reduxjs/toolkit';

import {theme} from './reducers/ThemeSlice';
import {sofas} from './reducers/SofasSlice';


const rootReducer = combineReducers({
  theme,
  sofas

})


export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  })
}

export const store = setupStore();

export type RootState = ReturnType<RootStore['getState']>;
/*export type RootState = ReturnType<typeof rootReducer>;*/
export type RootStore = ReturnType<typeof setupStore>;

/*
export type AppDispatch = typeof store.dispatch;
*/
export type AppDispatch = RootStore['dispatch']

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
