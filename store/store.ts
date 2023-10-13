import {Action, combineReducers} from 'redux';
import {configureStore, ThunkAction} from '@reduxjs/toolkit';
import themeReducer from '../store/reducers/ThemeSlice'


const rootReducer = combineReducers({
  themeReducer
})


export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true
  })
}

export const store = setupStore();

export type RootState = ReturnType<RootStore['getState']>;
export type RootStore = ReturnType<typeof rootReducer>;

/*
export type AppDispatch = typeof store.dispatch;
*/
export type AppDispatch = RootStore['dispatch']

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
