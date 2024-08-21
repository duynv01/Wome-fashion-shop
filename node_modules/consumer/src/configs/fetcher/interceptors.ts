import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export const accessTokenInterceptor = (request: InternalAxiosRequestConfig) => {
  if (!localStorage) return request;
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken && request.headers['Authorization'] === undefined) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
};

export const accessApplicationJsonInterceptor = (
  request: InternalAxiosRequestConfig,
) => {
  if (request.headers['Content-Type'] === undefined) {
    request.headers['Content-Type'] = 'application/json';
  }

  return request;
};

export const responseInterceptor = (response: AxiosResponse) => {
  return response.data;
};

export const errorInterceptor = (error: AxiosError) => {
  throw {
    ...(error.response?.data || {}),
  }
};
