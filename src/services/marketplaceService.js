import apiService from './apiService';

const marketplaceService = {
  uploadTemplate: (formData) => apiService.post('/marketplace/upload', formData),
  getTemplates: (searchQuery = '') => apiService.get(`/marketplace/templates?search=${encodeURIComponent(searchQuery)}`),
  getTemplateById: (id) => apiService.get(`/marketplace/templates/${id}`),
  downloadTemplate: (id) => apiService.get(`/marketplace/templates/${id}/download`, { responseType: 'blob' }),
  purchaseTemplate: (id) => apiService.post(`/marketplace/templates/${id}/purchase`),
  getStaticFile: (filename) => `https://webuifixer.onrender.com/api/marketplace/uploads/${filename}`,
};

export default marketplaceService;
