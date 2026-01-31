import React from "react";

export default function IssuesBadge({ count }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent-1/10 text-accent-1 border border-accent-1/20">
      {count} Issues
    </span>
  );
}

