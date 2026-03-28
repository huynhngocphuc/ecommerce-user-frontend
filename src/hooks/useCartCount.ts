import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useCartCount = () => {
  const count = useSelector((state: RootState) => state.products.cartItems.length);

  return {
    count,
    isVisible: count > 0,
  };
};
