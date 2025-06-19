import axios, { type AxiosInstance, type AxiosResponse, AxiosError} from 'axios';
import { getToken } from '@/utils/cookies';

export const redirectToLogin = () => {
  // Cookies.remove(import.meta.env.VITE_COOKIE_JWT, {
  //   domain: import.meta.env.VITE_COOKIE_DOMAIN,
  // });
  // const locationHref = window.location.href
  // const loginUrl = import.meta.env.VITE_FAIRFAX_LOGIN
  // window.location.replace(`${loginUrl}?next=${locationHref}`)
};

const BASE_URL = import.meta.env.VITE_API_URL;

// Interfaces

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

 

const axiosErrorFactory = (error: AxiosError) => {
  let e;
  if (error.response) {
    e = {
      code: error.response.status,
    };
  } else if (error.request) {
    e = {
      ...error.request,
      code: error.request.status,
    };
  } else {
    e = {
      ...error,
      code: null,
    };
  }
  return e;
};

instance.interceptors.request.use(
  (config) => {
    const token =  getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => Promise.reject(error),
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      // redirectToLogin()
    }
    return Promise.reject(error);
  },
);

// Métodos genéricos
export const httpGet = <T>({ url, params = {} }): Promise<T | undefined> =>
  instance
    .get<T>(url, { params })
    .then((res) => res.data)
    .catch((e) => Promise.reject(axiosErrorFactory(e)));

export const httpPost = <T>({ url, body = {}, params = {} }): Promise<T> =>
  instance
    .post<T>(url, body, { params })
    .then((res) => res.data)
    .catch((e) => Promise.reject(axiosErrorFactory(e)));

export const httpPatch = <T>({ url, body = {}, params = {} }): Promise<T> =>
  instance
    .patch<T>(url, body, { params })
    .then((res) => res.data)
    .catch((e) => Promise.reject(axiosErrorFactory(e)));

export const httpPut = <T>({ url, body = {}, params = {} }): Promise<T> =>
  instance
    .put<T>(url, body, { params })
    .then((res) => res.data)
    .catch((e) => Promise.reject(axiosErrorFactory(e)));

export const httpDelete = <T>({ url, params = {} }): Promise<T> =>
  instance
    .delete<T>(url, { params })
    .then((res) => res.data)
    .catch((e) => Promise.reject(axiosErrorFactory(e)));

 
