// src/utils/http.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api',
  timeout: 10000,
  withCredentials: true
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  err => {
    if (err.code === 'ECONNABORTED') {
      err.response = {
        status: 408,
        data: { message: 'Превышено время ожидания сервера' }
      };
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
