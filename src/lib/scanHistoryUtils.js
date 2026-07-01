/**
 * scanHistoryUtils.js
 * Pure utilities for transforming raw audit arrays into chart-ready data.
 */

/**
 * Groups an array of audit objects (with createdAt) into weekly buckets.
 * Returns an array of { week: 'W1', count: N, label: 'Jun 1–7' } objects.
 *
 * @param {Array<{createdAt: string}>} scans
 * @returns {Array<{ week: string, count: number, label: string }>}
 */
export function groupScansByWeek(scans = []) {
  if (!scans.length) return [];

  // Sort oldest first
  const sorted = [...scans].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const earliest = new Date(sorted[0].createdAt);
  // Snap to start of that week (Monday)
  const startOfWeek = new Date(earliest);
  startOfWeek.setDate(earliest.getDate() - earliest.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  const weekMap = {};

  sorted.forEach((scan) => {
    const date = new Date(scan.createdAt);
    const diffDays = Math.floor((date - startOfWeek) / (1000 * 60 * 60 * 24));
    const weekIndex = Math.floor(diffDays / 7);
    const weekKey = `W${weekIndex + 1}`;

    if (!weekMap[weekKey]) {
      const weekStart = new Date(startOfWeek);
      weekStart.setDate(startOfWeek.getDate() + weekIndex * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      weekMap[weekKey] = {
        week: weekKey,
        count: 0,
        label: `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}–${weekEnd.getDate()}`,
      };
    }

    weekMap[weekKey].count++;
  });

  return Object.values(weekMap).sort((a, b) =>
    parseInt(a.week.slice(1)) - parseInt(b.week.slice(1))
  );
}

/**
 * Calculates a simple week-over-week trend percentage.
 * Compares the last two weeks. Returns 0 if not enough data.
 *
 * @param {Array<{ count: number }>} weeklyData
 * @returns {number} Percentage change (positive = up, negative = down)
 */
export function calculateTrend(weeklyData = []) {
  if (weeklyData.length < 2) return 0;
  const last = weeklyData[weeklyData.length - 1].count;
  const prev = weeklyData[weeklyData.length - 2].count;
  if (prev === 0) return last > 0 ? 100 : 0;
  return Math.round(((last - prev) / prev) * 100);
}
