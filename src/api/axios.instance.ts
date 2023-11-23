import axios from 'axios';
import { removeCookie, getCookie } from './cookie';

axios.defaults.withCredentials = true;
const COOKIE_NAME = 'access_token';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BE_HOST,
  withCredentials: true
});

instance.interceptors.request.use(async (config) => {
  const token = getCookie(COOKIE_NAME);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      removeCookie(COOKIE_NAME);
      window.location.href = 'login';
      alert(error.response.data.message);
    }
  }
);

export default instance;
