// src/pages/Auth/SignUp/SignUpPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { setTokens } from "../../services/apiService";

import SignUpHeader from "../../components/AuthPages/SignUpHeader";
import SignUpLeftPanel from "../../components/AuthPages/SignUpLeftPanel";
import SignUpFormCard from "../../components/AuthPages/SignUpFormCard";
import SignUpFooter from "../../components/AuthPages/SignUpFooter";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSignUp = async (payload) => {
    try {
      setError(null);
      // The payload probably has { name, email, password }
      const res = await authService.register(payload);
      if (res.data?.token) {
        // Some systems return tokens immediately on register, others require login
        setTokens(res.data.token, res.data.refreshToken);
        navigate("/dashboard");
      } else {
        // Fallback to login if no token is provided by register endpoint
        navigate("/auth");
      }
    } catch (err) {
      console.error("Sign up failed:", err);
      setError(err?.error || err?.errors?.[0]?.msg || "Failed to register");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-1 text-text-2">
      <SignUpHeader />

      <main className="grow flex flex-col items-center justify-center px-4 py-12">
        {error && <div className="mb-4 text-red-500 bg-red-100 p-3 rounded-lg max-w-sm w-full text-center">{error}</div>}
        <div className="max-w-275 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <SignUpLeftPanel />
          <SignUpFormCard
            onSubmit={handleSignUp}
            onContinueGoogle={() => console.log("google signup")}
            onContinueGithub={() => console.log("github signup")}
          />
        </div>
      </main>

      <SignUpFooter />
    </div>
  );
}
