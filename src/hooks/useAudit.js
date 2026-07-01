import { useState, useEffect, useCallback } from 'react';
import auditService from '../services/auditService';

/**
 * useAudit — fetches audit data and recommendations together.
 *
 * @param {string|null} auditId - The ID of the audit to fetch. If null, returns empty state.
 * @returns {{ audit, recommendations, isLoading, error, refetch }}
 */
export function useAudit(auditId) {
  const [audit, setAudit] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(!!auditId);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!auditId || auditId === 'undefined' || auditId === 'null') {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [auditRes, recRes] = await Promise.all([
        auditService.getAudit(auditId),
        auditService.getRecommendations(auditId),
      ]);

      setAudit(auditRes);

      // Normalise recommendation shape — backend can return in various shapes
      const recs =
        recRes?.recommendations ||
        recRes?.data?.recommendations ||
        recRes?.data ||
        (Array.isArray(recRes) ? recRes : []);
      setRecommendations(recs);
    } catch (err) {
      console.error('[useAudit] Failed to fetch audit:', err);
      setError(err?.error || err?.message || 'Failed to load audit data.');
    } finally {
      setIsLoading(false);
    }
  }, [auditId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { audit, recommendations, isLoading, error, refetch: fetchData };
}
