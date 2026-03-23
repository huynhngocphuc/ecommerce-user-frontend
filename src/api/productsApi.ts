// src/api/productsApi.ts
import axiosClient from './axiosClient';
import { Product, ProductsResponse } from '../redux/products/type';

export interface ApiError {
  message: string;
  code?: string | number;
}

export const getProducts = async (query?: { page?: number; limit?: number }): Promise<ProductsResponse> => {
  try {
    const response = await axiosClient.get<ProductsResponse>('/products', { params: query });
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Failed to fetch products';
    throw {
      message,
      code: error?.response?.status,
    };
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axiosClient.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Failed to fetch product';
    throw {
      message,
      code: error?.response?.status,
    };
  }
};
