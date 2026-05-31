import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Common";

export default function AuthHeader({ onSignUpClick }) {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur bg-black/80 px-6 py-4 h-16 flex items-center">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 min-w-0 group">
          <div className="text-accent-1 shrink-0 bg-accent-1/10 p-1.5 rounded-lg group-hover:bg-accent-1 group-hover:text-white transition-all">
            <span className="material-symbols-outlined text-[20px]">auto_fix_high</span>
          </div>

          <h2 className="text-white text-lg font-black leading-tight tracking-tighter truncate">
            KREATE UI
          </h2>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            className="text-text-3 text-sm font-bold hover:text-accent-1 transition-colors uppercase tracking-widest"
            to="/docs"
          >
            Docs
          </Link>
          <Link
            className="text-text-3 text-sm font-bold hover:text-accent-1 transition-colors uppercase tracking-widest"
            to="/features"
          >
            Features
          </Link>

          <Button variant="primary" size="sm" onClick={onSignUpClick} className="shadow-lg shadow-accent-1/20">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
