import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Common";

export default function AuthHeader({ onSignUpClick }) {
  return (
    <header className="w-full border-b border-gray-200 dark:border-border-dark px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <img src="/logo.png" alt="Kreate UI Logo" className="h-10 w-auto object-contain" />
        </div>

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
