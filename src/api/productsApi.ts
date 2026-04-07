// src/api/productsApi.ts
import axiosClient from './axiosClient';
import { Product, ProductsResponse } from '../redux/products/type';

export interface ApiError {
  message: string;
  code?: string | number;
}

export interface ProductListQuery {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  priceRange?: string;
  size?: string;
  color?: string;
  brand?: string;
  style?: string;
  sortBy?: 'createdAt' | 'price' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export const getProducts = async (query?: ProductListQuery): Promise<ProductsResponse> => {
  try {
    const response = await axiosClient.get<ProductsResponse>('/products', { params: query });
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Failed to fetch products';
    const apiError = new Error(message) as Error & ApiError;
    apiError.code = error?.response?.status;
    throw apiError;
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axiosClient.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Failed to fetch product';
    const apiError = new Error(message) as Error & ApiError;
    apiError.code = error?.response?.status;
    throw apiError;
  }
};
