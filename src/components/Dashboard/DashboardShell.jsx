import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Drawer } from "@/components/Common";
import { Link } from "react-router-dom";

export default function DashboardShell({ active = "analyze", fullWidth = false, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-1 text-text-1">
      {/* Desktop sidebar - Fixed position */}
      <div className="hidden lg:block fixed top-0 left-0 h-screen z-30">
        <Sidebar active={active} />
      </div>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-bg-1/90 backdrop-blur-sm border-b border-border-1 h-14">
        <div className="px-4 h-full flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="size-8 bg-accent-1 rounded-lg flex items-center justify-center text-white">
              <span className="text-sm font-bold">AI</span>
            </div>
            <span className="font-bold text-text-1">AI ENHANCE</span>
          </Link>

          <button
            type="button"
            className="p-2 rounded-lg hover:bg-surface-2 text-text-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <Drawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        position="left"
        title={null} // Hide Drawer title/close to let Sidebar handle it
        className="w-64" // Match Sidebar width
        noPadding={true}
      >
        <div className="h-full">
          <Sidebar active={active} onClose={() => setMobileOpen(false)} />
        </div>
      </Drawer>

      {/* Content - with left margin for fixed sidebar on desktop */}
      <main className={`lg:ml-64 min-h-screen ${fullWidth ? 'p-0' : 'px-4 sm:px-6 lg:px-8 py-6 lg:py-10'}`}>
        {/* push content down under mobile top bar */}
        <div className={`pt-14 lg:pt-0 ${fullWidth ? 'h-full' : 'max-w-6xl mx-auto'}`}>{children}</div>
      </main>
    </div>
  );
}
