import axios from 'axios';
import {API_URL} from "../../config/constants.jsx";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post('/api/auth/refresh');
        const { accessToken } = response.data;

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        localStorage.setItem('accessToken', accessToken);

        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = '/admin/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
