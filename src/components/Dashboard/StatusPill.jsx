import React from "react";

export default function StatusPill({ status }) {
  if (status === "processing") {
    return (
      <div className="flex items-center gap-2">
        <div className="size-2 rounded-full bg-accent-1 animate-pulse shadow-[0_0_8px_rgba(75,31,191,0.6)]" />
        <span className="text-xs font-medium text-accent-1">Processing</span>
      </div>
    );
  }

  if (status === "completed") {
    return (
      <div className="flex items-center gap-2">
        <div className="size-2 rounded-full bg-success" />
        <span className="text-xs font-medium text-success">Completed</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="size-2 rounded-full bg-danger" />
      <span className="text-xs font-medium text-danger">Failed</span>
    </div>
  );
}

