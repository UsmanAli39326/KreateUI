import React from "react";
import { Button } from "../Common";

export default function AuthHeader({ onSignUpClick }) {
  return (
    <header className="w-full border-b border-gray-200 dark:border-border-dark px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <img src="/logo.png" alt="Kreate UI Logo" className="h-10 w-auto object-contain" />
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-gray-600 dark:text-text-secondary text-sm font-medium hover:text-primary transition-colors"
            href="#"
          >
            Docs
          </a>
          <a
            className="text-gray-600 dark:text-text-secondary text-sm font-medium hover:text-primary transition-colors"
            href="#"
          >
            Features
          </a>

          <Button variant="primary" size="sm" onClick={onSignUpClick}>
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
