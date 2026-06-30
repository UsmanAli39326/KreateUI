import apiService from './apiService';

const ROOT_URL = import.meta.env.VITE_BASE_URL 
  ? import.meta.env.VITE_BASE_URL.replace(/\/api\/?$/, '') 
  : 'https://webuifixer.onrender.com';

const auditService = {
  startAudit: (url, useAi = false) => apiService.get(`${ROOT_URL}/audit?url=${encodeURIComponent(url)}&ai=${useAi}`),
  getAudit: (id) => apiService.get(`/audit/${id}/json`),
  getPdfReport: (id) => apiService.get(`/audit/${id}/report/pdf`),
  getHtmlReport: (id) => apiService.get(`/audit/${id}/report/html`),
  acceptSuggestion: (auditId, ruleId) => apiService.patch(`/audit/${auditId}/suggestions/${ruleId}/accept`),
  rejectSuggestion: (auditId, ruleId) => apiService.patch(`/audit/${auditId}/suggestions/${ruleId}/reject`),
  deleteAudit: (id) => apiService.delete(`/audit/${id}`),
  getRecommendations: (auditId) => apiService.get(`/recommendations/${auditId}`),
};

export default auditService;
