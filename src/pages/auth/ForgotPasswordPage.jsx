import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../components/AuthPages/AuthHeader";
import Footer from "../../components/Footer";
import { Button, Input, useToast } from "../../components/Common";
import authService from "../../services/authService";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const toast = useToast();

  const [stage, setStage] = useState("email"); // 'email' | 'otp' | 'reset' | 'success'
  // stages: email → otp → reset → success
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ─── Stage 1: Send OTP via POST /auth/forgot-password ───────────────────────
  const sendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email address.", "Validation Error");
      return;
    }
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      toast.success("OTP sent! Check your inbox.", "Email Sent");
      setStage("otp");
    } catch (err) {
      console.error("[ForgotPassword] API error:", err);
      const msg =
        err?.error ||
        err?.message ||
        "Failed to send OTP. Please try again.";
      toast.error(msg, "Request Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    sendOtp();
  };

  // ─── Stage 2: Advance from OTP screen to Reset screen ──────────────────────
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP.", "Validation Error");
      return;
    }
    setStage("reset");
  };

  // ─── Stage 3: Reset Password via POST /auth/reset-password ──────────────────
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.", "Validation Error");
      return;
    }
    setLoading(true);
    try {
      await authService.resetPassword({ email, otp, newPassword });
      toast.success("Your password has been reset!", "Success");
      setStage("success");
    } catch (err) {
      const msg =
        err?.error ||
        err?.message ||
        "Failed to reset password. Check your OTP and try again.";
      toast.error(msg, "Reset Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-1 text-text-2">
      <AuthHeader onSignUpClick={() => navigate("/signup")} hideSignUp />

      <main className="flex-1 flex items-center justify-center p-6 flex-col">
        <div className="bg-surface-1 border border-border-1 rounded-2xl p-8 w-full max-w-md shadow-sm">

          {/* ── Progress Indicator ─────────────────────────────────── */}
          {stage !== "success" && (() => {
            const steps = ["email", "otp", "reset"];
            const currentIdx = steps.indexOf(stage);
            return (
              <div className="flex items-center gap-2 mb-6">
                {steps.map((s, i) => (
                  <React.Fragment key={s}>
                    <div
                      className={`size-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                        i < currentIdx
                          ? "bg-success text-white"
                          : i === currentIdx
                          ? "bg-primary text-white"
                          : "bg-surface-2 text-text-3"
                      }`}
                    >
                      {i < currentIdx ? (
                        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </div>
                    {i < steps.length - 1 && (
                      <div
                        className={`flex-1 h-px transition-colors ${
                          i < currentIdx ? "bg-success" : "bg-border-1"
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            );
          })()}

          <h1 className="text-2xl font-bold text-text-1 mb-2">Reset Password</h1>

          {/* ── Stage 1: Enter Email ───────────────────────────────── */}
          {stage === "email" && (
            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
              <p className="text-sm text-text-3 mb-2">
                Enter your registered email address and we'll send you a one-time password (OTP) to reset your account.
              </p>
              <Input
                id="forgot-email"
                label="Email Address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                disabled={loading}
              />
              <Button type="submit" variant="primary" fullWidth className="mt-2" disabled={loading}>
                {loading ? "Sending OTP…" : "Send OTP"}
              </Button>
              <button
                type="button"
                onClick={() => navigate("/auth")}
                className="text-sm text-text-3 hover:text-text-1 transition-colors mt-2"
              >
                ← Back to Login
              </button>
            </form>
          )}

          {/* ── Stage 2: Enter OTP only ───────────────────────────── */}
          {stage === "otp" && (
            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
              <p className="text-sm text-text-3 mb-2">
                We've sent a 6-digit OTP to{" "}
                <span className="font-medium text-text-1">{email}</span>. Enter it below to continue.
              </p>
              <Input
                id="forgot-otp"
                label="One-Time Password (OTP)"
                type="text"
                required
                inputMode="numeric"
                pattern="\d{6}"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                autoFocus
              />
              <Button type="submit" variant="primary" fullWidth className="mt-2">
                Verify OTP
              </Button>
              <div className="flex items-center justify-between mt-1">
                <button
                  type="button"
                  onClick={() => setStage("email")}
                  className="text-sm text-text-3 hover:text-text-1 transition-colors"
                >
                  ← Change Email
                </button>
                <button
                  type="button"
                  onClick={sendOtp}
                  className="text-sm text-primary hover:underline transition-colors"
                  disabled={loading}
                >
                  {loading ? "Sending…" : "Resend OTP"}
                </button>
              </div>
            </form>
          )}

          {/* ── Stage 3: Set New Password ──────────────────────────── */}
          {stage === "reset" && (
            <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
              <p className="text-sm text-text-3 mb-2">
                OTP verified! Now set a new password for your account.
              </p>
              <Input
                id="forgot-new-password"
                label="New Password"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                autoFocus
              />
              <Input
                id="forgot-confirm-password"
                label="Confirm New Password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
              />
              <Button type="submit" variant="primary" fullWidth className="mt-2" disabled={loading}>
                {loading ? "Resetting Password…" : "Reset Password"}
              </Button>
              <button
                type="button"
                onClick={() => setStage("otp")}
                className="text-sm text-text-3 hover:text-text-1 transition-colors mt-1"
                disabled={loading}
              >
                ← Back to OTP
              </button>
            </form>
          )}

          {/* ── Stage: Success ─────────────────────────────────────── */}
          {stage === "success" && (
            <div className="text-center py-6">
              <div className="size-14 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-text-1 mb-2">Password Reset!</h2>
              <p className="text-sm text-text-3 mb-6">
                Your password has been successfully reset. You can now log in with your new password.
              </p>
              <Button variant="primary" fullWidth onClick={() => navigate("/auth")}>
                Go to Login
              </Button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
