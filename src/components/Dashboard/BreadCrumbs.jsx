import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center gap-2 text-xs font-medium text-text-3 mb-2">
      {items.map((it, idx) => (
        <React.Fragment key={it.label}>
          {idx > 0 ? <span className="opacity-60">/</span> : null}
          {it.href ? (
            <Link className="hover:text-accent-1 transition-colors" to={it.href}>
              {it.label}
            </Link>
          ) : (
            <span className="text-text-1">{it.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

