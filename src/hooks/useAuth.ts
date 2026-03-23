// src/hooks/useAuth.ts
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { login, logout } from '../redux/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated: !!token,
    login: (email: string, password: string) =>
      dispatch(login({ email, password })),
    logout: () => dispatch(logout()),
  };
};
