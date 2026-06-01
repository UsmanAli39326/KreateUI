import apiService from './apiService';

const marketplaceService = {
  uploadTemplate: (formData) => apiService.post('/marketplace/upload', formData),
  getTemplates: (searchQuery = '') => apiService.get(`/marketplace/templates?search=${encodeURIComponent(searchQuery)}`),
  downloadTemplate: (id) => apiService.get(`/marketplace/templates/${id}/download`),
  purchaseTemplate: (id) => apiService.post(`/marketplace/templates/${id}/purchase`),
};

export default marketplaceService;
