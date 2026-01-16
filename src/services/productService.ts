import api from '../api/config';
import { Product } from '../types';

export const productService = {
  // Get all products (Website & Admin)
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get('api/public/products');
    console.log("All products data fetched:", response.data.data);
    return response.data.data;
  },

  // Get single product (Details Page)
  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`api/public/products/${id}`);
    console.log("Product data fetched:", response.data);
    return response.data;
  },

};