import {MultiValue, SingleValue} from 'react-select';

export interface ISelectInputOption {
  value: string | number,
  label: string | number
}

export type SelectOptionType = MultiValue<ISelectInputOption> | SingleValue<ISelectInputOption> | null
