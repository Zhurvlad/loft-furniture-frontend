

export interface IPriceRAnge {
  priceRange: number[],
  setPriceRange: (num: number[]) => void,
  setIsPriceChanged: (arg: boolean) => void
}

export interface IQueryParams {
  offset: string,
  sortBy: string,
  brand: string,
  priceTo: string,
  priceFrom: string,
  color: string,
  itemId: string
}
