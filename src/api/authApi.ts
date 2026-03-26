// src/api/authApi.ts
import axiosClient from './axiosClient';
import { User } from '../redux/auth/type';
import { AUTH_API_ROUTES } from '../utils/routes';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user?: User;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string | number;
}

const toApiError = (error: any, fallbackMessage: string): ApiError => {
  const message = error?.response?.data?.message || error?.message || fallbackMessage;
  return {
    message,
    code: error?.response?.status,
  };
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosClient.post<LoginResponse>(AUTH_API_ROUTES.LOGIN, { email, password });
    return response.data;
  } catch (error: any) {
    throw toApiError(error, 'Login failed');
  }
};

export const loginApi = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  return login(credentials.email, credentials.password);
};

export const verifySessionApi = async (): Promise<void> => {
  try {
    await axiosClient.get(AUTH_API_ROUTES.VERIFY);
  } catch (error: any) {
    throw toApiError(error, 'Session verification failed');
  }
};

export const getProfileApi = async (): Promise<User> => {
  try {
    const response = await axiosClient.get<User>(AUTH_API_ROUTES.PROFILE);
    return response.data;
  } catch (error: any) {
    throw toApiError(error, 'Profile fetch failed');
  }
};

export const refreshSessionApi = async (): Promise<void> => {
  try {
    await axiosClient.post(AUTH_API_ROUTES.REFRESH);
  } catch (error: any) {
    throw toApiError(error, 'Session refresh failed');
  }
};

export const logoutApi = async (): Promise<void> => {
  try {
    await axiosClient.post(AUTH_API_ROUTES.LOGOUT);
  } catch (error: any) {
    throw toApiError(error, 'Logout failed');
  }
};
