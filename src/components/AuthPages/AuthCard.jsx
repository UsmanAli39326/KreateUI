// src/pages/Auth/AuthCard.jsx
import React, { useState } from "react";
import { Button, Input, Card } from "../Common";
import { useNavigate } from "react-router-dom";


export default function AuthCard({
    onSignInEmail,
    onSignInGithub,
    onSignInGoogle,
    onSignUpClick,
    onForgotPasswordClick,
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        onSignInEmail?.({ email, password });
    };

    return (
        <div className="w-full max-w-[440px] flex flex-col">
            {/* Headline */}
            <div className="text-center mb-8">
                <h1 className="text-text-1 text-[28px] sm:text-[32px] lg:text-5xl font-bold leading-tight mb-2">
                    Welcome Back
                </h1>
                <p className="text-gray-600 dark:text-text-secondary text-base">
                    Sign in to enhance your UI accessibility
                </p>
            </div>

            {/* Auth Card */}
            <Card className="bg-surface-1 border border-border-1 shadow-xl rounded-xl p-8">
                {/* Social Logins */}
                <div className="flex flex-col gap-3">
                    <Button
                        variant="secondary"
                        fullWidth
                        onClick={onSignInGithub}
                        icon={<span className="material-symbols-outlined text-xl">terminal</span>}
                    >
                        Sign in with GitHub
                    </Button>

                    <Button
                        variant="secondary"
                        fullWidth
                        onClick={onSignInGoogle}
                        icon={
                            <span className="material-symbols-outlined text-xl text-red-500">
                                account_circle
                            </span>
                        }
                    >
                        Sign in with Google
                    </Button>
                </div>

                {/* Divider */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200 dark:border-border-dark" />
                    </div>
                    <div className="relative flex justify-center text-sm uppercase">
                        <span className="bg-surface-1 px-4 text-gray-400 dark:text-text-secondary">
                            Or continue with email
                        </span>
                    </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailSubmit} className="space-y-6">
                    <Input
                        id="email"
                        label="Email Address"
                        type="email"
                        placeholder="dev@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium text-gray-700 dark:text-text-secondary"
                            >
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={onForgotPasswordClick}
                                className="text-xs font-medium text-accent-1 cursor-pointer hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        fullWidth
                        iconRight={<span className="material-symbols-outlined text-sm">login</span>}
                    >
                        Sign In
                    </Button>
                </form>

                {/* Footer Links */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500 dark:text-text-secondary">
                        Don&apos;t have an account?{" "}
                        <button
                            type="button"
                            onClick={onSignUpClick}
                            className="text-accent-1 font-semibold hover:underline cursor-pointer"
                        >
                            Create an account
                        </button>
                    </p>
                </div>
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
