import React, { useState } from "react";

export default function ComplianceTrendChart({ data }) {
    const [period, setPeriod] = useState("30");

    const periods = [
        { value: "30", label: "Last 30 Days" },
        { value: "7", label: "Last 7 Days" }
    ];

    // Determine the latest average score
    const latestScore = data.weeklyData && data.weeklyData.length > 0 
        ? data.weeklyData[data.weeklyData.length - 1].averageScore 
        : 0;

    const maxScore = 100;
    const pathPoints = data.weeklyData && data.weeklyData.length > 1 
        ? data.weeklyData.map((d, i) => {
            const x = (i / (data.weeklyData.length - 1)) * 478;
            const y = 150 - ((d.averageScore || 0) / maxScore) * 120; // leaves padding
            return `${i === 0 ? 'M' : 'L'}${x} ${y}`;
        }).join(' ')
        : "M0 100 L478 100";
        
    const chartPath = data.chartPath || pathPoints;

    return (
        <div className="lg:col-span-2 bg-surface-1 border border-border-1 rounded-xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text-1">Compliance Score Trend</h3>
                <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="bg-bg-0 border border-border-2 rounded-lg text-xs font-medium py-1.5 px-3 text-text-2 focus:ring-1 focus:ring-[#8e52ff] focus:border-[#8e52ff] outline-none"
                >
                    {periods.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                </select>
            </div>

            {/* Stats */}
            <div className="mb-4">
                <p className="text-white tracking-tight text-3xl font-bold leading-tight">
                    {latestScore}% Avg Score
                </p>
                <div className="flex gap-1.5 items-center">
                    <p className="text-text-3 text-sm">Monthly trend</p>
                    <p className={`${data.monthlyTrend >= 0 ? 'text-success' : 'text-danger'} text-sm font-medium`}>
                        {data.monthlyTrend > 0 ? '+' : ''}{data.monthlyTrend}%
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="h-[200px] w-full mt-6">
                <svg className="w-full h-full" viewBox="0 0 478 150" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#8e52ff" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#8e52ff" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {/* Area */}
                    <path
                        d={`${chartPath}V150H0Z`}
                        fill="url(#chartGradient)"
                    />
                    {/* Line */}
                    <path
                        d={chartPath}
                        fill="none"
                        stroke="#8e52ff"
                        strokeLinecap="round"
                        strokeWidth="3"
                    />
                </svg>

                {/* Week Labels */}
                <div className="flex justify-between mt-4 px-1">
                    {data.weeklyData && data.weeklyData.map((week) => (
                        <span key={week.week} className="text-[10px] font-bold text-text-3 uppercase">
                            {week.week}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
