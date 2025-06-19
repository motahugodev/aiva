import Cookies from 'js-cookie';

export const addToken = (access_token?: string) => {
  Cookies.set('access_token', access_token);
};

export const addRefreshToken = (refresh_token?: string) => {
  Cookies.set('refresh_token', refresh_token);
};

export const removerToken = () => {
  Cookies.remove('access_token');
};

export const removerRefreshToken = () => {
  Cookies.remove('refresh_token');
};

export const getRefreshToken = () => {
  return Cookies.get('refresh_token');
};

export const getToken = () => {
  return Cookies.get('access_token');
};
