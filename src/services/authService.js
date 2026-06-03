import apiService from './apiService';

const authService = {
  register: (data) => apiService.post('/auth/register', data),
  login: (data) => apiService.post('/auth/login', data),
  logout: () => apiService.post('/auth/logout'),
  forgotPassword: (email) => apiService.post('/auth/forgot-password', { email }),
  resetPassword: (data) => apiService.post('/auth/reset-password', data),
  verifyEmail: (data) => apiService.post('/auth/verify-email', data),
};

export default authService;
