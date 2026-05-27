import axios from 'axios';

// In production (Vercel), API calls go to the Railway backend URL.
// In development, Vite proxy handles /api → localhost:5000.
const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.url?.includes('/auth/me')) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
