import axios from 'axios';

const appApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || '', // Base URL for your API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

appApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log('Request Config:', config);
  return config;
}, (error) => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

appApi.interceptors.response.use(
  (response) => {
    console.log('Response:', response); 
    return response;
  },
  (error) => {
    console.error('Response error:', error.response); 
    if (error.response?.status === 401) {
      console.error('Unauthorized, logging out...');
      localStorage.removeItem('authToken'); 
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);


export default appApi;
