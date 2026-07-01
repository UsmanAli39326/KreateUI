// src/pages/Auth/SignUp/SignUpHeader.jsx
import React from "react";
import { Button } from "../Common";
import { Link } from "react-router-dom";

export default function SignUpHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border-1 px-6 md:px-10 py-3 bg-bg-1">
      <div className="flex items-center gap-3 min-w-0">
        <Link to="/">
          <img src="/logo.png" alt="Kreate UI Logo" className="h-10 w-auto object-contain" />
        </Link>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-text-3 text-sm font-bold hover:text-accent-1 transition-colors uppercase tracking-widest"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="size-3.5">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Home
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden md:block text-sm text-text-3">Already have an account?</span>

        <Link to="/auth">
          <Button variant="secondary" size="sm" className="border border-border-2 bg-primary/10 text-primary">
            Log In
          </Button>
        </Link>
      </div>
    </header>
  );
}
