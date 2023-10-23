import {createSlice, PayloadAction} from '@reduxjs/toolkit';


/*const getTheme = () => {
  const theme = `${typeof window !== "undefined"?.localStorage?.getItem('theme')}`
  if ([ 'light', 'dark' ].includes(theme)) return theme

  const userMedia =  window.matchMedia('(prefers-color-scheme: light)')
  if (userMedia.matches) return 'light'

  return 'dark'
}*/



interface ThemeState {
  theme: string
}

const initialState: ThemeState = {
  theme: 'light'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload
    }
  },
})

export const { setTheme } = themeSlice.actions

export const theme = themeSlice.reducer
