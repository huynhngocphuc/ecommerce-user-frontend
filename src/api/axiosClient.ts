// src/api/axiosClient.ts
import axios from 'axios';
import ENV from '../utils/env';

if (!ENV.IS_API_BASE_URL_ALLOWED) {
  throw new Error(ENV.API_SECURITY_REASON ?? 'Blocked insecure API base URL configuration.');
}

const axiosClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.dispatchEvent(new Event('logout'));
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
