// src/pages/Auth/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthHeader from "../../components/AuthPages/AuthHeader";
import AuthCard from "../../components/AuthPages/AuthCard";
import AuthFooter from "../../components/AuthPages/AuthFooter";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-bg-1 text-text-2">
      <AuthHeader onSignUpClick={() => navigate("/auth/register")} />

      <main className="flex-1 flex items-center justify-center p-6">
        <AuthCard
          onSignInEmail={async ({ email, password }) => {
            try {
              await login(email, password);
              navigate("/dashboard");
            } catch (error) {
              console.error("Failed to log in", error);
              alert("Failed to log in: " + error.message);
            }
          }}
          onSignInGithub={() => {
            // TODO: OAuth redirect
            console.log("github");
          }}
          onSignInGoogle={() => {
            // TODO: OAuth redirect
            console.log("google");
          }}
          onSignUpClick={() => navigate("/auth/register")}
          onForgotPasswordClick={() => navigate("/auth/reset")}
        />
      </main>

      <AuthFooter />
    </div>
  );
}
