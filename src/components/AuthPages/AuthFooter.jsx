// src/pages/Auth/AuthFooter.jsx
import React from "react";

export default function AuthFooter() {
  return (
    <footer className="py-6 px-6 sm:px-10 border-t border-gray-200 dark:border-border-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500 dark:text-text-secondary">
          © 2026 UI Enhancement Platform Inc.
        </p>
        <div className="flex gap-6">
          <a className="text-xs text-gray-500 dark:text-text-secondary hover:text-primary" href="#">
            Privacy Policy
          </a>
          <a className="text-xs text-gray-500 dark:text-text-secondary hover:text-primary" href="#">
            Terms of Service
          </a>
          <a className="text-xs text-gray-500 dark:text-text-secondary hover:text-primary" href="#">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
