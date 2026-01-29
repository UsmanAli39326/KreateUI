// src/pages/Auth/SignUp/SignUpFormCard.jsx
import React, { useState } from "react";
import { Button, Input, Card } from "../Common"
import { Link, Navigate } from "react-router-dom";

export default function SignUpFormCard({ onSubmit, onContinueGoogle, onContinueGithub }) {
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.({ fullName, workEmail, company, password, agree });
  };

  return (
    <div className="w-full max-w-[500px] mx-auto lg:mx-0">
      <Card className="bg-surface-1 p-8 md:p-10 rounded-2xl shadow-2xl border border-border-2">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-text-1 mb-2">Create your account</h2>
          <p className="text-text-3 text-sm">Fill in your details to get started with the free tier.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            id="fullName"
            label={
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">person</span>
                Full Name
              </span>
            }
            type="text"
            placeholder="e.g. Alex Johnson"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input
            id="workEmail"
            label={
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                Work Email
              </span>
            }
            type="email"
            placeholder="alex@company.com"
            value={workEmail}
            onChange={(e) => setWorkEmail(e.target.value)}
            required
          />

          <Input
            id="company"
            label={
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">business</span>
                Company / Organization
              </span>
            }
            type="text"
            placeholder="Acme Corp"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          {/* Password with toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-text-2 flex items-center gap-2" htmlFor="password">
              <span className="material-symbols-outlined text-[18px]">lock</span>
              Password
            </label>

            <div className="relative">
              <Input
                id="password"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="!mb-0"
              />

              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-3 hover:text-primary transition-colors"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPw ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-3 py-2">
            <input
              id="terms"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 rounded border-border-2 bg-bg-2 text-primary focus:ring-primary"
            />
            <label htmlFor="terms" className="text-sm text-text-3 leading-snug">
              I agree to the{" "}
              <a className="text-primary hover:underline" href="#">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="text-primary hover:underline" href="#">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isDisabled={!agree}
            iconRight={<span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
            onClick={()=>{
                Navigate("/dashboard")
            }}
          >
            Create Account
          </Button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center py-6">
          <div className="flex-grow border-t border-border-1" />
          <span className="flex-shrink mx-4 text-xs font-bold uppercase tracking-widest text-text-3">
            or continue with
          </span>
          <div className="flex-grow border-t border-border-1" />
        </div>

        {/* OAuth buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="secondary"
            fullWidth
            onClick={onContinueGoogle}
            icon={
              <img
                alt="Google"
                className="size-5"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxaXhqrokVzjtyM8uiWRWR5K5QQRyDnVqJGSA_FR6NtE1bDsPb-5nAV30qm4Cyz3YDNPFRVLSrCRYPc-g5noLbWJTot7UK6cWDaEjrBjCrGfq5riiHPn4o7NzJ4ih0eFxqYhsiQ0pSjOKLGYqTSWYL2-PpxrG66ja3S9XP7KqchA4zy-cPHNonIhWFVtbjla3ZoYBJYSB2uu9U0vMc3YzFpyK7e29wK_XLSPRoujFElinWTZPB2VCP3OJD2QQ7BBJ6HbA53gIfN4mI"
              />
            }
          >
            Google
          </Button>

          <Button
            variant="secondary"
            fullWidth
            onClick={onContinueGithub}
            icon={
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            }
          >
            GitHub
          </Button>
        </div>

        <p className="text-center mt-8 text-sm text-text-3">
          Already a member?{" "}
          <Link className="text-primary font-bold hover:underline" to="/auth">
            Log in to your account
          </Link>
        </p>
      </Card>
    </div>
  );
}
