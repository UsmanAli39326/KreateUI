// src/pages/Auth/SignUp/SignUpFooter.jsx
import React from "react";

export default function SignUpFooter() {
  return (
    <footer className="mt-auto py-8 border-t border-border-1">
      <div className="max-w-[1100px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
          <span>Secure SSL encryption for all data</span>
        </div>

        <div className="flex gap-8">
          <a className="hover:text-primary transition-colors" href="#">
            Documentation
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Status
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
}
