import { useState } from 'react';
import authService from '../services/AuthService';  // Dịch vụ auth

const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hàm đăng nhập
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.login(username, password);
      localStorage.setItem('authToken', data.token);  // Lưu token vào localStorage
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
};

export default useLogin;
