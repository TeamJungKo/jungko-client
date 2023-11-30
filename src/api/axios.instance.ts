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

let isAuthErrorAlertShown = false;

instance.interceptors.response.use(
  (response) => {
    isAuthErrorAlertShown = false;
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && !isAuthErrorAlertShown) {
      isAuthErrorAlertShown = true;
      removeCookie(COOKIE_NAME);
      alert('로그인이 필요합니다.');
      window.location.href = '/';
    }
  }
);

export default instance;
