import apiService from './apiService';

const adminService = {
  // GET /api/admin/analytics
  getAnalytics: () => apiService.get('/admin/analytics'),

  // GET /api/admin/users?page=
  getUsers: (page = 1) => apiService.get(`/admin/users?page=${page}`),

  // DELETE /api/admin/users/:id
  deleteUser: (id) => apiService.delete(`/admin/users/${id}`),

  // PATCH /api/admin/users/:id/block
  toggleUserBlock: (id) => apiService.patch(`/admin/users/${id}/block`),

  // GET /api/admin/logs?page=
  getLogs: (page = 1) => apiService.get(`/admin/logs?page=${page}`),

  // GET /api/admin/marketplace/pending
  getPendingTemplates: () => apiService.get('/admin/marketplace/pending'),

  // PATCH /api/admin/marketplace/:id/approve
  approveTemplate: (id) => apiService.patch(`/admin/marketplace/${id}/approve`),

  // PATCH /api/admin/marketplace/:id/reject
  rejectTemplate: (id) => apiService.patch(`/admin/marketplace/${id}/reject`),
};

export default adminService;
