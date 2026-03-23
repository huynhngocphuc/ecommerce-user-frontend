// src/hooks/useProducts.ts
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchProducts } from '../redux/products/productSlice';

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, total } = useSelector(
    (state: RootState) => state.products
  );

  return {
    items,
    loading,
    error,
    total,
    fetchProducts: (query?: { page?: number; limit?: number }) =>
      dispatch(fetchProducts(query)),
  };
};
