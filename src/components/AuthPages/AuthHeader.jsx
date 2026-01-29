import React from "react";
import { Button } from "../Common";

export default function AuthHeader({ onSignUpClick }) {
  return (
    <header className="w-full border-b border-gray-200 dark:border-border-dark px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="text-primary shrink-0">
            <svg
              className="size-6"
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
              />
            </svg>
          </div>

          <h2 className="text-gray-100 dark:text-text-main text-lg font-bold leading-tight tracking-tight truncate">
            UI Enhancement Platform
          </h2>
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
