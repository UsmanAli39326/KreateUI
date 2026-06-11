import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../components/AuthPages/AuthHeader";
import Footer from "../../components/Footer";
import { Button, Input } from "../../components/Common";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState("email"); // 'email', 'otp', 'reset', 'success'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Simulate sending OTP API call
    setStage("otp");
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Simulate verifying OTP API call
    setStage("reset");
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Simulate resetting password API call
    setStage("success");
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-1 text-text-2">
      <AuthHeader onSignUpClick={() => navigate("/signup")} />

      <main className="flex-1 flex items-center justify-center p-6 flex-col">
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-8 w-full max-w-md shadow-sm">
          <h1 className="text-2xl font-bold text-text-1 mb-2">Reset Password</h1>

          {stage === "email" && (
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
              <p className="text-sm text-text-3 mb-2">
                Enter your email address and we'll send you an OTP to reset your password.
              </p>
              <Input
                id="email"
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
              />
              <Button type="submit" variant="primary" fullWidth className="mt-2">
                Send OTP
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

          {stage === "otp" && (
            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
              <p className="text-sm text-text-3 mb-2">
                We've sent an OTP to <span className="font-medium text-text-1">{email}</span>. Please enter it below.
              </p>
              <Input
                id="otp"
                label="One-Time Password (OTP)"
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
              />
              <Button type="submit" variant="primary" fullWidth className="mt-2">
                Verify OTP
              </Button>
              <button 
                type="button" 
                onClick={() => setStage("email")}
                className="text-sm text-text-3 hover:text-text-1 transition-colors mt-2"
              >
                Change Email
              </button>
            </form>
          )}

          {stage === "reset" && (
            <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
              <p className="text-sm text-text-3 mb-2">
                Please enter your new password.
              </p>
              <Input
                id="newPassword"
                label="New Password"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
              <Input
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
              <Button type="submit" variant="primary" fullWidth className="mt-2">
                Reset Password
              </Button>
            </form>
          )}

          {stage === "success" && (
            <div className="text-center py-6">
              <div className="size-12 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-text-2 mb-6">Your password has been successfully reset. You can now log in with your new password.</p>
              <Button variant="secondary" fullWidth onClick={() => navigate("/auth")}>
                Return to Login
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
