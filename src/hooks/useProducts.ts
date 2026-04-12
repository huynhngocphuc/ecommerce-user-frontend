// src/hooks/useProducts.ts
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ProductListQuery } from '../api/productsApi';
import { Pagination } from '../redux/products/type';
import {
  addToCart,
  clearCart,
  fetchProducts,
  removeFromCart,
  selectCartCount,
} from '../redux/products/productSlice';

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error, pagination } = useSelector(
    (state: RootState) => state.products
  );
  const cartCount = useSelector(selectCartCount as (state: RootState) => number);

  const handleFetchProducts = useCallback(
    (query?: ProductListQuery) => dispatch(fetchProducts(query)),
    [dispatch]
  );

  const handleAddToCart = useCallback(
    (product: RootState['products']['products'][number]) => dispatch(addToCart(product)),
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    (productId: string) => dispatch(removeFromCart(productId)),
    [dispatch]
  );

  const handleClearCart = useCallback(() => dispatch(clearCart()), [dispatch]);

  return {
    products,
    loading,
    error,
    cartCount,
    pagination,
    fetchProducts: handleFetchProducts,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    clearCart: handleClearCart,
  };
};
