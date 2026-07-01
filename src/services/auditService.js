import apiService from './apiService';

// ROOT_URL strips /api so we can call /audit which is registered at root level on Express (not under /api)
const ROOT_URL = import.meta.env.VITE_BASE_URL 
  ? import.meta.env.VITE_BASE_URL.replace(/\/api\/?$/, '') 
  : 'https://webuifixer.onrender.com';

const auditService = {
  // GET /audit?url=...&ai=... — root-level, not under /api
  startAudit: (url, useAi = false) =>
    apiService.get(`${ROOT_URL}/audit?url=${encodeURIComponent(url)}&ai=${useAi}`),

  // GET /api/audit/:id/json
  getAudit: (id) => apiService.get(`/audit/${id}/json`),

  // GET /api/audit/:id/report/pdf — returns Blob via content-type sniffing in apiService
  getPdfReport: (id) => apiService.get(`/audit/${id}/report/pdf`),

  // GET /api/audit/:id/report/html — returns HTML string
  getHtmlReport: (id) => apiService.get(`/audit/${id}/report/html`),

  // PATCH /api/audit/:id/suggestions/:ruleId/accept
  acceptSuggestion: (auditId, ruleId) =>
    apiService.patch(`/audit/${auditId}/suggestions/${ruleId}/accept`),

  // PATCH /api/audit/:id/suggestions/:ruleId/reject
  rejectSuggestion: (auditId, ruleId) =>
    apiService.patch(`/audit/${auditId}/suggestions/${ruleId}/reject`),

  // DELETE /api/audit/:id
  deleteAudit: (id) => apiService.delete(`/audit/${id}`),

  // GET /api/recommendations/:auditId
  getRecommendations: (auditId) => apiService.get(`/recommendations/${auditId}`),

  // POST /api/audit/:id/generate-fixes
  generateFixes: (auditId, issues) =>
    apiService.post(`/audit/${auditId}/generate-fixes`, { issues }),
};

export default auditService;
