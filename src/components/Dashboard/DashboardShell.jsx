import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

export default function DashboardShell({ active = "analyze", fullWidth = false, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-1 text-text-1 flex flex-col lg:flex-row">
      {/* Desktop sidebar - Fixed position */}
      <div className="hidden lg:block fixed top-0 left-0 h-screen z-30">
        <Sidebar active={active} />
      </div>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-bg-1/90 backdrop-blur-sm border-b border-border-1 h-14">
        <div className="px-4 h-full flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
          </Link>
          <button
            type="button"
            className="p-2 rounded-lg hover:bg-surface-2 text-text-2 flex items-center justify-center"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          ></div>
          <div className="relative flex w-64 max-w-xs flex-col bg-bg-1 h-full shadow-xl">
            <Sidebar active={active} onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Content - with left margin for fixed sidebar on desktop */}
      <main className={`flex-1 lg:ml-64 min-h-screen ${fullWidth ? 'p-0' : 'px-4 sm:px-6 lg:px-8 py-6 lg:py-10'}`}>
        {/* push content down under mobile top bar */}
        <div className={`pt-20 lg:pt-0 ${fullWidth ? 'h-full' : 'max-w-6xl mx-auto'}`}>{children}</div>
      </main>
    </div>
  );
}
