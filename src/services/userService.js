import apiService from './apiService';

const userService = {
  getProfile: () => apiService.get('/user/profile'),
  updateProfile: (data) => apiService.put('/user/profile', data),
  changePassword: (data) => apiService.put('/user/change-password', data),
  getAudits: (page = 1, limit = 10) => apiService.get(`/user/audits?page=${page}&limit=${limit}`),
  deleteAccount: (password) => apiService.delete('/user/account', { body: JSON.stringify({ password }) }),
};

export default userService;
