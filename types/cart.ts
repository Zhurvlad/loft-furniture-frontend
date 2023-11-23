

export interface ICart {
  id: number,
  userId: number,
  itemId: number,
  name: string,
  price: number,
  color: string,
  in_stocks: number,
  size: string,
  furniture_brand: string,
  oldPrice: number,
  image: string,
  count: number,
  total_price: number,
  createdAt: string,
  updatedAt: string
}


export interface ICartItems {
  image: string,
  name: string,
  price: number,
  total_price: number,
  oldPrice: number
}
