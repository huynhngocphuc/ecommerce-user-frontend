// src/api/authApi.ts
import axiosClient from './axiosClient';
import { User } from '../redux/auth/type';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  code?: string | number;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await axiosClient.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || 'Login failed';
    throw {
      message,
      code: error?.response?.status,
    };
  }
};

export const loginApi = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  return login(credentials.email, credentials.password);
};
