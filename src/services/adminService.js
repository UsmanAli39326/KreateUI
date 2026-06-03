import apiService from './apiService';

const adminService = {
  getAnalytics: () => apiService.get('/admin/analytics'),
  deleteUser: (id) => apiService.delete(`/admin/users/${id}`),
  toggleUserBlock: (id) => apiService.patch(`/admin/users/${id}/block`),
  getLogs: (page = 1) => apiService.get(`/admin/logs?page=${page}`),
};

export default adminService;
