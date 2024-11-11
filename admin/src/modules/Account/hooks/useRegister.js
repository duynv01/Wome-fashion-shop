import { useState } from 'react';
import authService from '../services/AuthService';

const useRegister = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hàm đăng ký
  const register = async (username, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.register(username, email, password);
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return { register, error, loading };
};

export default useRegister;
