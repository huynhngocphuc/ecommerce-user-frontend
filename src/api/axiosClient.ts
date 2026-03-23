// src/api/axiosClient.ts
import axios from 'axios';
import ENV from '../utils/env';

const axiosClient = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 responses by clearing token and triggering logout
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token from localStorage and trigger logout
      localStorage.removeItem('token');
      localStorage.removeItem('userSession');
      // Dispatch logout action could be done here via store if needed
      // For now, just clear storage and let the app handle re-authentication
      window.dispatchEvent(new Event('logout'));
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
