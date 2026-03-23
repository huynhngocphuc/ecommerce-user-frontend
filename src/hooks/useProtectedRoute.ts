// src/hooks/useProtectedRoute.ts
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useProtectedRoute = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const checkAuthentication = (redirectTo: string = '/login') => {
    if (!isAuthenticated) {
      navigate(redirectTo);
      return false;
    }
    return true;
  };

  return { checkAuthentication, isAuthenticated };
};
