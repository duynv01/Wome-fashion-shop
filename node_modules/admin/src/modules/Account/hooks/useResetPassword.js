import { useState } from 'react';
import authService from '../services/AuthService'; 

const useResetPassword = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Hàm reset mật khẩu
  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.resetPassword(email);
      return data.message || 'A reset link has been sent to your email.';
    } catch (err) {
      setError(err.response?.data?.message || 'Reset password failed');
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, error, loading };
};

export default useResetPassword;
