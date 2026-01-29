// src/pages/Auth/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

import AuthHeader from "../../components/AuthPages/AuthHeader";
import AuthCard from "../../components/AuthPages/AuthCard";
import AuthFooter from "../../components/AuthPages/AuthFooter";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-bg-1 text-text-2">
      <AuthHeader onSignUpClick={() => navigate("/signup")} />

      <main className="flex-1 flex items-center justify-center p-6">
        <AuthCard
          onSignInEmail={({ email, password }) => {
            // TODO: call your auth API
            console.log("login:", { email, password });
          }}
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
