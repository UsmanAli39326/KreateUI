import React from "react";
import AuthHeader from "../../components/AuthPages/AuthHeader";
import ForgotPassword from "../../components/AuthPages/ForgotPassword";
import AuthFooter from "../../components/AuthPages/AuthFooter";

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex flex-col bg-bg-1 text-text-2">
            <AuthHeader onSignUpClick={() => navigate("/auth/register")} />

            <main className="flex-1 flex items-center justify-center p-6">
                <ForgotPassword />
            </main>

            <AuthFooter />
        </div>
    );
}
