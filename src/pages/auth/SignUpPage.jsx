// src/pages/Auth/SignUp/SignUpPage.jsx
import React from "react";
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

  const handleSignUp = async (payload) => {
    const apiPayload = {
      name: payload.fullName,
      email: payload.workEmail,
      password: payload.password,
    };
    try {
      const res = await authService.register(apiPayload);
      toast.success("Account created! Please log in to continue.", "Success");
      if (res.data?.token || res.token) {
        // API returned a token directly — log the user in immediately
        const token = res.data?.token || res.token;
        const refreshToken = res.data?.refreshToken || res.refreshToken;
        await login(token, refreshToken);
        navigate("/dashboard");
      } else {
        // Standard flow: register returns user only, redirect to login
        navigate("/auth");
      }
    } catch (err) {
      console.error("Sign up failed:", err);
      const errMsg =
        err?.error ||
        err?.errors?.[0]?.msg ||
        err?.message ||
        "Registration failed. Please try again.";
      toast.error(errMsg, "Registration Failed");
      // Re-throw so SignUpFormCard's finally block resets isLoading
      throw err;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-1 text-text-2">
      <SignUpHeader />

      <main className="grow flex flex-col items-center justify-center px-4 py-12">
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
