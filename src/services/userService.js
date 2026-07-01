import apiService from './apiService';

const userService = {
  // GET /api/user/profile
  getProfile: () => apiService.get('/user/profile'),

  // PUT /api/user/profile
  updateProfile: (data) => apiService.put('/user/profile', data),

  // PUT /api/user/change-password
  changePassword: (data) => apiService.put('/user/change-password', data),

  // GET /api/user/audits?page=&limit=
  getAudits: (page = 1, limit = 10) => apiService.get(`/user/audits?page=${page}&limit=${limit}`),

  // GET /api/user/stats
  getStats: () => apiService.get('/user/stats'),

  // GET /api/user/scan-history?days=
  getScanHistory: (days = 30) => apiService.get(`/user/scan-history?days=${days}`),

  // GET /api/user/compliance-report
  getComplianceReport: () => apiService.get('/user/compliance-report'),

  // PUT /api/user/profile/photo — accepts FormData (multipart)
  uploadProfilePhoto: (formData) => apiService.put('/user/profile/photo', formData),

  // DELETE /api/user/account — sends password in body via POST-style workaround
  // NOTE: fetch's DELETE doesn't reliably support body — we use a custom header approach
  deleteAccount: (password) => apiService.delete('/user/account', {
    headers: { 'X-Confirm-Password': password },
    body: JSON.stringify({ password }),
  }),
};

export default userService;
