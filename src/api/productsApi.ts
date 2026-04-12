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
    const response = await axiosClient.get<any>(`/products/${id}`);

    // Backward-compatible parsing for both wrapped and direct payloads.
    const rawProduct = response?.data?.data?.product || response?.data?.product || response?.data;

    const media = Array.isArray(rawProduct?.media)
      ? rawProduct.media
          .filter((item: any) => item && typeof item.url === 'string' && item.url.trim() !== '')
          .map((item: any) => ({
            url: item.url,
            alt: item.alt,
            isPrimary: item.isPrimary,
            sortOrder: item.sortOrder,
          }))
      : [];

    const sizeOptions = Array.isArray(rawProduct?.sizeOptions)
      ? rawProduct.sizeOptions
          .filter((item: any) => item && typeof item.value === 'string' && item.value.trim() !== '')
          .map((item: any) => ({
            value: item.value,
            label: item.label || item.value,
            available: item.available,
          }))
      : [];

    const colorOptions = Array.isArray(rawProduct?.colorOptions)
      ? rawProduct.colorOptions
          .filter((item: any) => item && typeof item.value === 'string' && item.value.trim() !== '')
          .map((item: any) => ({
            value: item.value,
            label: item.label || item.value,
            available: item.available,
            swatchHex: item.swatchHex,
          }))
      : [];

    return {
      ...rawProduct,
      id: rawProduct?.id || rawProduct?._id || id,
      media,
      sizeOptions,
      colorOptions,
    } as Product;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Failed to fetch product';
    const apiError = new Error(message) as Error & ApiError;
    apiError.code = error?.response?.status;
    throw apiError;
  }
};
