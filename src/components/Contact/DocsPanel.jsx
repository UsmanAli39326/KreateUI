// src/pages/Contact/sections/DocsPanel.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function DocsPanel() {
  return (
    <div className="p-5 rounded-xl border border-primary/20 bg-primary/5">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-text-1 text-base font-bold leading-tight">
            Need immediate help?
          </p>
          <p className="text-text-3 text-sm mt-1">
            Check our developer documentation for quick answers to common integration questions.
          </p>
        </div>

        <Link className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline" to="/documentation">
          View Documentation
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}
