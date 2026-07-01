import apiService from './apiService';

// Static base for direct file access (not through /api)
const STATIC_BASE = import.meta.env.VITE_BASE_URL
  ? import.meta.env.VITE_BASE_URL.replace(/\/api\/?$/, '')
  : 'https://webuifixer.onrender.com';

const marketplaceService = {
  // POST /api/marketplace/upload — FormData (multipart)
  uploadTemplate: (formData) => apiService.post('/marketplace/upload', formData),

  // GET /api/marketplace/templates?search=
  getTemplates: (searchQuery = '') =>
    apiService.get(`/marketplace/templates?search=${encodeURIComponent(searchQuery)}`),

  // GET /api/marketplace/templates/:id
  getTemplateById: (id) => apiService.get(`/marketplace/templates/${id}`),

  // GET /api/marketplace/templates/:id/download
  // NOTE: responseType:'blob' was an Axios option — not valid for fetch.
  // apiService already handles binary responses via Content-Type sniffing.
  downloadTemplate: (id) => apiService.get(`/marketplace/templates/${id}/download`),

  // POST /api/marketplace/templates/:id/purchase
  purchaseTemplate: (id) => apiService.post(`/marketplace/templates/${id}/purchase`),

  // Direct static file URL (not an API call — used for <img> src etc.)
  getStaticFileUrl: (filename) => `${STATIC_BASE}/api/marketplace/uploads/${filename}`,
};

export default marketplaceService;
