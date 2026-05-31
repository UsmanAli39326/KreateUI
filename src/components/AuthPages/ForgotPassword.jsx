import React, { useState } from "react";
import { Button, Input, Card } from "../Common";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError("");
            await resetPassword(email);
            setIsSubmitted(true);
        } catch (err) {
            console.error("Failed to reset password", err);
            setError("Failed to reset password: " + err.message);
        }
    };

    return (
        <div className="w-full max-w-[440px] flex flex-col">
            <div className="text-center mb-8">
                <h1 className="text-text-1 text-[28px] sm:text-[32px] lg:text-5xl font-bold leading-tight mb-2">
                    Reset Password
                </h1>
                <p className="text-gray-600 dark:text-text-secondary text-base">
                    Enter your email to receive a reset link
                </p>
            </div>

            <Card className="bg-surface-1 border border-border-1 shadow-xl rounded-xl p-8">
                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            id="email"
                            label="Email Address"
                            type="email"
                            placeholder="dev@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            fullWidth
                            className="mt-2"
                        >
                            Send Reset Link
                        </Button>

                        <div className="text-center mt-4">
                            <button
                                type="button"
                                onClick={() => navigate("/auth/login")}
                                className="text-sm text-text-3 hover:text-text-1 transition-colors"
                            >
                                Back to Login
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center space-y-6">
                        <div className="flex justify-center">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                                <span className="material-symbols-outlined text-green-500 text-3xl">mark_email_read</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-text-1 mb-2">Check your email</h3>
                            <p className="text-text-2 text-sm">
                                We've sent a password reset link to <strong>{email}</strong>
                            </p>
                        </div>
                        <Button
                            variant="secondary"
                            fullWidth
                            onClick={() => navigate("/auth/login")}
                        >
                            Back to Login
                        </Button>
                    </div>
                )}
            </Card>

            {/* Bottom Meta */}
            <div className="mt-8 flex flex-col items-center gap-2">
                <p className="text-xs text-gray-400 dark:text-text-secondary/50 flex items-center gap-1 text-center">
                    <span className="material-symbols-outlined text-xs" aria-hidden="true">
                        shield
                    </span>
                    Secure infrastructure with enterprise-grade encryption
                </p>
            </div>
        </div>
    );
}
