// src/hooks/useAuth.ts
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { bootstrapSession, clearSession, login, logoutSession } from '../redux/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, sessionStatus, isLoading, isRefreshing, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    const onLogout = () => {
      dispatch(clearSession());
    };

    window.addEventListener('logout', onLogout);
    return () => window.removeEventListener('logout', onLogout);
  }, [dispatch]);

  const loginUser = useCallback(
    (email: string, password: string) => dispatch(login({ email, password })).unwrap(),
    [dispatch]
  );

  const logoutUser = useCallback(() => dispatch(logoutSession()), [dispatch]);
  const bootstrap = useCallback(() => dispatch(bootstrapSession()), [dispatch]);

  return {
    user,
    sessionStatus,
    isLoading,
    isRefreshing,
    error,
    isAuthenticated: sessionStatus === 'authenticated',
    isSessionResolved: sessionStatus !== 'unknown',
    login: loginUser,
    logout: logoutUser,
    bootstrapSession: bootstrap,
  };
};
