// src/pages/Auth/AuthFooter.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AuthFooter() {
  return (
    <footer className="py-8 px-6 sm:px-10 border-t border-border-1 bg-[#090b0e] mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-3">
          © 2024 KREATE UI • AI DRIVEN INTERFACE ENHANCEMENT
        </p>
        <div className="flex gap-8">
          <Link className="text-[10px] font-bold uppercase tracking-widest text-text-3 hover:text-accent-1 transition-colors" to="/privacy">
            Privacy Policy
          </Link>
          <Link className="text-[10px] font-bold uppercase tracking-widest text-text-3 hover:text-accent-1 transition-colors" to="/terms">
            Terms of Service
          </Link>
          <Link className="text-[10px] font-bold uppercase tracking-widest text-text-3 hover:text-accent-1 transition-colors" to="/support">
            Support
          </Link>
        </div>
      </div>
    </footer>
  );
}
