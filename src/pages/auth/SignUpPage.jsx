// src/pages/Auth/SignUp/SignUpPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/Common";

import SignUpHeader from "../../components/AuthPages/SignUpHeader";
import SignUpLeftPanel from "../../components/AuthPages/SignUpLeftPanel";
import SignUpFormCard from "../../components/AuthPages/SignUpFormCard";
import Footer from "../../components/Footer";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();
  const [error, setError] = useState(null);

  const handleSignUp = async (payload) => {
    try {
      setError(null);
      const apiPayload = {
        name: payload.fullName,
        email: payload.workEmail,
        password: payload.password,
      };
      const res = await authService.register(apiPayload);
      toast.success("Account created successfully!", "Success");
      if (res.data?.token || res.token) {
        // Some systems return tokens immediately on register, others require login
        const token = res.data?.token || res.token;
        const refreshToken = res.data?.refreshToken || res.refreshToken;
        await login(token, refreshToken);
        navigate("/dashboard");
      } else {
        // Fallback to login if no token is provided by register endpoint
        navigate("/auth");
      }
    } catch (err) {
      console.error("Sign up failed:", err);
      const errMsg = err?.error || err?.errors?.[0]?.msg || "Failed to register";
      setError(errMsg);
      toast.error(errMsg, "Registration Failed");
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

      <Footer />
    </div>
  );
}
