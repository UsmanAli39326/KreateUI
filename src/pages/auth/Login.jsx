// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/Common";

import AuthHeader from "../../components/AuthPages/AuthHeader";
import AuthCard from "../../components/AuthPages/AuthCard";
import Footer from "../../components/Footer";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();
  const [error, setError] = useState(null);

  const handleSignIn = async ({ email, password }) => {
    try {
      setError(null);
      const res = await authService.login({ email, password });
      if (res.data?.token || res.token) {
        const token = res.data?.token || res.token;
        const refreshToken = res.data?.refreshToken || res.refreshToken;
        await login(token, refreshToken);
        toast.success("Welcome back! Loading your workspace...", "Signed In");
        const redirectTo = new URLSearchParams(window.location.search).get('redirect');
        navigate(redirectTo ? decodeURIComponent(redirectTo) : '/dashboard');
      }
    } catch (err) {
      console.error("Login failed:", err);
      const errMsg = err?.error || err?.errors?.[0]?.msg || "Invalid credentials";
      setError(errMsg);
      toast.error(errMsg, "Sign In Failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-1 text-text-2">
      <AuthHeader onSignUpClick={() => navigate("/signup")} />

      <main className="flex-1 flex items-center justify-center p-6 flex-col">
        {error && <div className="mb-4 text-red-500 bg-red-100 p-3 rounded-lg max-w-sm w-full text-center">{error}</div>}
        <AuthCard
          onSignInEmail={handleSignIn}
          onSignInGithub={() => {
            // TODO: OAuth redirect
            console.log("github");
          }}
          onSignInGoogle={() => {
            // TODO: OAuth redirect
            console.log("google");
          }}
          onSignUpClick={() => navigate("/signup")}
          onForgotPasswordClick={() => navigate("/forgot-password")}
        />
      </main>

      <Footer />
    </div>
  );
}
