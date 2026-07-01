import { useState, useEffect, useCallback } from 'react';
import userService from '../services/userService';
import { groupScansByWeek, calculateTrend } from '../lib/scanHistoryUtils';

/**
 * useUserStats — fetches user stats, scan history, and recent audits in one shot.
 * Used by OverviewPage and ReportsPage.
 *
 * @param {{ auditPage?: number, auditLimit?: number, historyDays?: number }} options
 * @returns {{ stats, scanHistory, audits, isLoading, error, refetch }}
 */
export function useUserStats({
  auditPage = 1,
  auditLimit = 10,
  historyDays = 30,
} = {}) {
  const [stats, setStats] = useState(null);
  const [scanHistory, setScanHistory] = useState(null);
  const [audits, setAudits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [statsRes, historyRes, auditsRes] = await Promise.all([
        userService.getStats(),
        userService.getScanHistory(historyDays),
        userService.getAudits(auditPage, auditLimit),
      ]);

      setStats(statsRes?.data || statsRes);

      // Map raw scan array into chart-ready format
      const rawHistory = historyRes?.data || historyRes || [];
      const weeklyData = groupScansByWeek(Array.isArray(rawHistory) ? rawHistory : []);
      setScanHistory({
        totalScans: Array.isArray(rawHistory) ? rawHistory.length : 0,
        monthlyTrend: calculateTrend(weeklyData),
        weeklyData,
      });

      const auditList = auditsRes?.data?.audits || auditsRes?.audits || [];
      setAudits(auditList);
    } catch (err) {
      console.error('[useUserStats] Failed:', err);
      setError(err?.error || err?.message || 'Failed to load dashboard data.');
    } finally {
      setIsLoading(false);
    }
  }, [auditPage, auditLimit, historyDays]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { stats, scanHistory, audits, isLoading, error, refetch: fetchData };
}
