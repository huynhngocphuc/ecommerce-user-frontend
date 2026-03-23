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

export const loginApi = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axiosClient.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};
