import apiService from './apiService';

const auditService = {
  startAudit: (url, useAi = false) => apiService.get(`/audit?url=${encodeURIComponent(url)}&ai=${useAi}`),
  getPdfReport: (id) => apiService.get(`/audit/${id}/report/pdf`),
  getHtmlReport: (id) => apiService.get(`/audit/${id}/report/html`),
  acceptSuggestion: (auditId, ruleId) => apiService.patch(`/audit/${auditId}/suggestions/${ruleId}/accept`),
  rejectSuggestion: (auditId, ruleId) => apiService.patch(`/audit/${auditId}/suggestions/${ruleId}/reject`),
  deleteAudit: (id) => apiService.delete(`/audit/${id}`),
  getRecommendations: (auditId) => apiService.get(`/recommendations/${auditId}`),
};

export default auditService;
