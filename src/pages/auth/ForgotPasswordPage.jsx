import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../components/AuthPages/AuthHeader";
import Footer from "../../components/Footer";
import { Button } from "../../components/Common";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-1 text-text-2">
      <AuthHeader onSignUpClick={() => navigate("/signup")} />

      <main className="flex-1 flex items-center justify-center p-6 flex-col">
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-8 w-full max-w-md shadow-sm">
          <h1 className="text-2xl font-bold text-text-1 mb-2">Reset Password</h1>
          {submitted ? (
            <div className="text-center py-6">
              <div className="size-12 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-text-2 mb-6">If an account exists for <span className="font-medium text-text-1">{email}</span>, you will receive a password reset link shortly.</p>
              <Button variant="secondary" fullWidth onClick={() => navigate("/auth")}>
                Return to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <p className="text-sm text-text-3 mb-2">Enter your email address and we'll send you a link to reset your password.</p>
              <div>
                <label className="block text-sm font-medium text-text-2 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-surface-1 border border-border-1 rounded-lg text-sm text-text-1 focus:border-accent-1 outline-none transition-colors"
                  placeholder="you@company.com"
                />
              </div>
              <Button type="submit" variant="primary" fullWidth className="mt-2">
                Send Reset Link
              </Button>
              <button 
                type="button" 
                onClick={() => navigate("/auth")}
                className="text-sm text-text-3 hover:text-text-1 transition-colors mt-2"
              >
                Back to Login
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
