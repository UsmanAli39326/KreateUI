import apiService from './apiService';

const ROOT_URL = import.meta.env.VITE_BASE_URL 
  ? import.meta.env.VITE_BASE_URL.replace(/\/api\/?$/, '') 
  : 'https://webuifixer.onrender.com';

const auditService = {
  startAudit: (url, useAi = false) => apiService.get(`${ROOT_URL}/audit?url=${encodeURIComponent(url)}&ai=${useAi}`),
  getPdfReport: (id) => apiService.get(`${ROOT_URL}/audit/${id}/report/pdf`),
  getHtmlReport: (id) => apiService.get(`${ROOT_URL}/audit/${id}/report/html`),
  acceptSuggestion: (auditId, ruleId) => apiService.patch(`${ROOT_URL}/audit/${auditId}/suggestions/${ruleId}/accept`),
  rejectSuggestion: (auditId, ruleId) => apiService.patch(`${ROOT_URL}/audit/${auditId}/suggestions/${ruleId}/reject`),
  deleteAudit: (id) => apiService.delete(`${ROOT_URL}/audit/${id}`),
  getRecommendations: (auditId) => apiService.get(`/recommendations/${auditId}`),
};

export default auditService;
