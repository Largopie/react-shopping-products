export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface ProductsResponseData {
  content: Product[];
  last: boolean;
}
