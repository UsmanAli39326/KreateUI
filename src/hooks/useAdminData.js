import { useState, useEffect, useCallback } from 'react';
import adminService from '../services/adminService';

/**
 * useAdminData — fetches analytics, users list, logs, and pending templates for AdminPage.
 *
 * @param {{ logPage?: number, userPage?: number }} options
 * @returns {{ analytics, users, logs, pendingTemplates, isLoading, error, refetch }}
 */
export function useAdminData({ logPage = 1, userPage = 1 } = {}) {
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [pendingTemplates, setPendingTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [analyticsRes, usersRes, logsRes, pendingRes] = await Promise.allSettled([
        adminService.getAnalytics(),
        adminService.getUsers(userPage),
        adminService.getLogs(logPage),
        adminService.getPendingTemplates(),
      ]);

      // Use settled results so a single failing endpoint doesn't break the whole page
      if (analyticsRes.status === 'fulfilled') {
        setAnalytics(analyticsRes.value?.data || analyticsRes.value);
      }
      if (usersRes.status === 'fulfilled') {
        const userList = usersRes.value?.data?.users || usersRes.value?.users || usersRes.value?.data || [];
        setUsers(Array.isArray(userList) ? userList : []);
      }
      if (logsRes.status === 'fulfilled') {
        setLogs(logsRes.value?.data || logsRes.value || []);
      }
      if (pendingRes.status === 'fulfilled') {
        const templates = pendingRes.value?.data || pendingRes.value || [];
        setPendingTemplates(Array.isArray(templates) ? templates : []);
      }
    } catch (err) {
      console.error('[useAdminData] Failed:', err);
      setError(err?.error || err?.message || 'Failed to load admin data.');
    } finally {
      setIsLoading(false);
    }
  }, [logPage, userPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { analytics, users, logs, pendingTemplates, isLoading, error, refetch: fetchData };
}
