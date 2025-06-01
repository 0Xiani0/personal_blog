import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://xiany.ru/',
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
