import {MultiValue, SingleValue} from 'react-select';
import * as React from 'react';

export interface ISelectInputOption {
  value: string | number,
  label: string | number
}

export type SelectOptionType = MultiValue<ISelectInputOption> | SingleValue<ISelectInputOption> | null


export interface IAccordion {
  children: React.ReactNode,
  title?: string,
  arrowClass?: string,
  cartTotalCount?: number,
  inCart?:boolean,
  cartContinue: boolean,
  toggleCartContinue: () => void
}
