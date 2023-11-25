import {ISofa} from '../models/ISofas';

export type TopSalesItemProps = {
  sofa: ISofa,
  sofaColor?: ISofasColor[]
}

export type ISofasColor = {
  id:number,
  hex: string,
  colorName: string,
  colorNameRu: string
}
