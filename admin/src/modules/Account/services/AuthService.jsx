import appApi from "../../../configs/fetchers/app-api";

const authService = {
 
  login: async (username, password) => {
    try {
      const response = await appApi.post('/auth/login', {
        username,
        password
      });
      return response.data;  
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      throw error; 
    }
  },

  
  register: async (username, email, password) => {
    try {
      const response = await appApi.post('/auth/register', {
        username,
        email,
        password
      });
      return response.data;
    } catch (error) {
      console.error('Register failed:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  resetPassword: async (email) => {
    try {
      const response = await appApi.post('/auth/reset-password', {
        email
      });
      return response.data;
    } catch (error) {
      console.error('Reset password failed:', error.response?.data?.message || error.message);
      throw error;
    }
  }
};

export default authService;
