// src/api/productsApi.ts
import axiosClient from './axiosClient';
import { Product } from '../features/products/type';

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosClient.get<Product[]>('/products');
  return response.data;
};
