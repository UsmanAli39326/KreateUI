// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { setTokens } from "../../services/apiService";

import AuthHeader from "../../components/AuthPages/AuthHeader";
import AuthCard from "../../components/AuthPages/AuthCard";
import AuthFooter from "../../components/AuthPages/AuthFooter";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignIn = async ({ email, password }) => {
    try {
      setError(null);
      const res = await authService.login({ email, password });
      if (res.data?.token) {
        setTokens(res.data.token, res.data.refreshToken);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err?.error || err?.errors?.[0]?.msg || "Invalid credentials");
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

      <AuthFooter />
    </div>
  );
}
