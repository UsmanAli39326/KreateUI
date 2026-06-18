import React, { useState, useEffect } from 'react';

// Simulated system initialization steps to display during loading
const SYSTEM_LOGS = [
  'INITIALIZING ENGINE_CORE...',
  'RESOLVING COMPONENT_SCHEMA...',
  'COMPILING SEMANTIC_GRID...',
  'INJECTING DESIGN_TOKENS...',
  'OPTIMIZING WCAG_CONTRAST...',
  'DETERMINING SYSTEM_READY...'
];

/**
 * Modern System-Themed PageLoader Component
 * Renders an abstract glowing wireframe grid compilation visualization and system logs.
 */
const PageLoader = ({ message = 'Loading...', isFullScreen = true }) => {
  const [logIndex, setLogIndex] = useState(0);

  // Cycle through system compiler logs
  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % SYSTEM_LOGS.length);
    }, 1200);

    return () => clearInterval(logInterval);
  }, []);

  const containerClasses = isFullScreen
    ? "fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background-main select-none"
    : "relative w-full min-h-[350px] flex flex-col items-center justify-center bg-background-main rounded-2xl overflow-hidden select-none border border-border-1";

  return (
    <div className={containerClasses} role="status" aria-live="polite">
      {/* System Wireframe Layout Compiler Visualization */}
      <div className="relative w-64 h-48 mb-6 flex items-center justify-center">
        {/* Glow backdrop behind the system wireframe */}
        <div className="absolute inset-0 bg-radial from-accent-soft to-transparent opacity-60 blur-2xl pointer-events-none" />

        {/* Outer System Frame */}
        <div className="w-56 h-36 border border-border-2 rounded-xl p-2 relative flex flex-col gap-2 bg-surface-1 shadow-ambient overflow-hidden">
          {/* Header Bar Wireframe */}
          <div className="w-full h-4 border border-border-2/70 rounded-md flex items-center justify-between px-2 bg-background-main/50 relative overflow-hidden">
            <div className="w-8 h-1.5 bg-primary/30 rounded-full animate-pulse" />
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-border-3" />
              <div className="w-1.5 h-1.5 rounded-full bg-border-3" />
              <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-ping" />
            </div>
          </div>

          {/* Main Layout Grid Wireframe */}
          <div className="flex-1 flex gap-2">
            {/* Sidebar Wireframe */}
            <div className="w-12 h-full border border-border-2/70 rounded-md p-1 flex flex-col gap-1 bg-background-main/20">
              <div className="w-full h-2 bg-border-2 rounded-sm" />
              <div className="w-2/3 h-1.5 bg-border-2 rounded-sm" />
              <div className="w-4/5 h-1.5 bg-border-2 rounded-sm" />
            </div>

            {/* Dashboard Workspace Wireframe */}
            <div className="flex-1 border border-border-2/70 rounded-md p-1.5 grid grid-cols-2 gap-1.5 bg-white relative">
              <div className="border border-border-2/50 rounded bg-background-main/30 flex items-center justify-center p-1 overflow-hidden">
                <div className="w-full h-1.5 bg-primary/10 rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1/2 bg-primary/70 rounded-full animate-[loading-bar_1.2s_infinite_ease-in-out]" />
                </div>
              </div>
              <div className="border border-border-2/50 rounded bg-background-main/30 flex items-center justify-center p-1 overflow-hidden">
                <div className="w-full h-1.5 bg-primary/10 rounded-full relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1/2 bg-primary/70 rounded-full animate-[loading-bar_1.2s_infinite_ease-in-out_delay-200]" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
              <div className="col-span-2 border border-border-2/50 rounded bg-background-main/30 flex flex-col justify-center gap-1 p-1">
                <div className="w-3/4 h-1.5 bg-border-2 rounded-sm" />
                <div className="w-1/2 h-1 bg-border-2 rounded-sm" />
              </div>
            </div>
          </div>

          {/* Code injection scan line overlay */}
          <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent top-0 animate-[scan-line_2.5s_infinite_linear]" />
        </div>
      </div>

      {/* Terminal-style rotating system logs */}
      <div className="mb-4 h-5 flex items-center justify-center text-center">
        <code className="text-[10px] font-mono tracking-widest text-text-3 uppercase select-none">
          <span className="text-primary mr-1">&gt;</span> {SYSTEM_LOGS[logIndex]}
        </code>
      </div>

      {/* Primary loading text at the bottom */}
      <div className="text-center px-4">
        <p className="text-xs font-mono tracking-[0.2em] uppercase text-text-1 font-bold">
          {message}
        </p>
      </div>

      {/* Keyframe animation definitions */}
      <style>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes scan-line {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
