
export interface ISofas {
  count: number,
  rows: ISofa[]
}

export interface ISofa {
  id: number
  name:string,
  category: string;
  initialRating: number;
  price: number;
  color: string;
  in_stocks: number;
  size: string;
  description: string;
  furniture_brand: string;
  oldPrice?: number;
  images: string;
  bestseller: boolean;
  new: boolean;
  createdAt: string;
  updatedAt: string;
}
