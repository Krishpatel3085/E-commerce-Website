export interface Product {
  discountPrice: any;
  isActive: any;
  _id: number;
  id: number;
  productName: string;
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
variants: Variant[];
  selectedVariant?: Variant;
  selectedSize?: string;
}
export interface Variant {
  images: any;
  color: string;
  colorCode?: string;
  image: {
    publicId: string;
    url: string;
  };
  size: Array<{
    name: string;
    stock: number;
    _id: string;
  }>;
}
export interface CartItem extends Product {
  quantity: number;
}