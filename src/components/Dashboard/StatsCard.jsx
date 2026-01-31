import React from "react";

function TrendIndicator({ value, direction }) {
    const isUp = direction === "up";
    const color = isUp ? "text-emerald-500" : "text-orange-500";

    return (
        <p className={`${color} text-sm font-bold flex items-center gap-0.5`}>
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isUp ? (
                    <path d="M7 17l5-5 5 5M7 7l5 5 5-5" />
                ) : (
                    <path d="M7 7l5 5 5-5M7 17l5-5 5 5" />
                )}
            </svg>
            {isUp ? "+" : "-"}{Math.abs(value)}%
        </p>
    );
}

function Icon({ name, className = "" }) {
    const iconClass = `size-6 ${className}`;

    switch (name) {
        case "analytics":
            return (
                <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18" />
                    <path d="M18 17V9" />
                    <path d="M13 17V5" />
                    <path d="M8 17v-3" />
                </svg>
            );
        case "warning":
            return (
                <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
            );
        case "lightbulb":
            return (
                <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                </svg>
            );
        default:
            return null;
    }
}

export default function StatsCard({
    title,
    value,
    trend,
    trendDirection,
    subtitle,
    icon,
    iconColor = "text-[#8e52ff]",
    showGlow = false,
    children
}) {
    return (
        <div className="bg-surface-1 border border-border-1 rounded-xl p-6 relative overflow-hidden group">
            {/* Glow effect */}
            {showGlow && (
                <div className="absolute -right-4 -top-4 bg-[#8e52ff]/10 rounded-full size-24 blur-2xl group-hover:bg-[#8e52ff]/20 transition-all" />
            )}

            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <p className="text-text-3 text-sm font-medium">{title}</p>
                <Icon name={icon} className={iconColor} />
            </div>

            {/* Value & Trend */}
            <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-text-1">{value}</p>
                {trend !== undefined && trendDirection && (
                    <TrendIndicator value={trend} direction={trendDirection} />
                )}
                {children}
            </div>

            {/* Subtitle */}
            {subtitle && (
                <p className="text-text-3 text-xs mt-4">{subtitle}</p>
            )}
        </div>
    );
}
