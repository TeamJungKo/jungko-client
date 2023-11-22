import { Cookies } from 'react-cookie';

type CookieOption = {
  path?: string;
  expires?: Date;
  maxAge?: number;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: boolean | 'none' | 'lax' | 'strict';
};

const cookies = new Cookies();

export const setCookie = (name: string, value: string, option?: CookieOption): void => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string): string => {
  return cookies.get(name);
};

export const removeCookie = (name: string, option?: CookieOption): void => {
  return cookies.remove(name, { ...option });
};
