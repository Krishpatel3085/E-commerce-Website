export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  description: string;
  colors: string[];
  sizes: string[];
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}