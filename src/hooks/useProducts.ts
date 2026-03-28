// src/hooks/useProducts.ts
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
  addToCart,
  clearCart,
  fetchProducts,
  removeFromCart,
  selectCartCount,
} from '../redux/products/productSlice';

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error, total } = useSelector(
    (state: RootState) => state.products
  );
  const cartCount = useSelector(selectCartCount as (state: RootState) => number);

  return {
    items,
    loading,
    error,
    total,
    cartCount,
    fetchProducts: (query?: { page?: number; limit?: number }) =>
      dispatch(fetchProducts(query)),
    addToCart: (product: RootState['products']['items'][number]) =>
      dispatch(addToCart(product)),
    removeFromCart: (productId: string) => dispatch(removeFromCart(productId)),
    clearCart: () => dispatch(clearCart()),
  };
};
