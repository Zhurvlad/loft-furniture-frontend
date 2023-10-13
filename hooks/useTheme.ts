import {useAppSelector} from './redux';


export const useTheme = () => {
  const {theme} = useAppSelector((state) => state.themeReducer)


}
