// src/pages/Auth/SignUp/SignUpHeader.jsx
import React from "react";
import { Button } from "../Common";
import { Link } from "react-router-dom";

export default function SignUpHeader() {
  return (
    <header className="flex items-center justify-between border-b border-border-1 px-6 md:px-10 py-3 bg-bg-1">
      <div className="flex items-center gap-3 min-w-0">
        <div className="size-8 text-primary shrink-0">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g clipPath="url(#clip0_6_319)">
              <path
                d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_6_319">
                <rect fill="white" height="48" width="48" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <h2 className="text-text-1 text-lg font-bold leading-tight tracking-tight truncate">
          UI Enhancement AI
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <span className="hidden md:block text-sm text-text-3">Already have an account?</span>

        <Link to="/auth/login">
          <Button variant="secondary" size="sm" className="border border-border-2 bg-primary/10 text-primary">
            Log In
          </Button>
        </Link>
      </div>
    </header>
  );
}
