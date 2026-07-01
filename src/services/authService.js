import apiService from './apiService';

const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://webuifixer.onrender.com/api';

const authService = {
  // POST /api/auth/register
  register: (data) => apiService.post('/auth/register', data),

  // POST /api/auth/login
  login: (data) => apiService.post('/auth/login', data),

  // POST /api/auth/logout
  logout: () => apiService.post('/auth/logout'),

  // POST /api/auth/forgot-password
  forgotPassword: (email) => apiService.post('/auth/forgot-password', { email }),

  // POST /api/auth/reset-password
  resetPassword: (data) => apiService.post('/auth/reset-password', data),

  // POST /api/auth/verify-email
  verifyEmail: (data) => apiService.post('/auth/verify-email', data),

  // POST /api/auth/refresh
  refreshToken: (refreshToken) => apiService.post('/auth/refresh', { refreshToken }),

  // OAuth — these are redirects, not fetch calls
  getGoogleAuthUrl: () => `${BASE_URL}/auth/google`,
  getGithubAuthUrl: () => `${BASE_URL}/auth/github`,
};

export default authService;
