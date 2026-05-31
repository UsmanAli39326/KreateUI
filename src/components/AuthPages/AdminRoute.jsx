import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * AdminRoute prevents non-admin users from accessing admin pages.
 * It assumes ProtectedRoute is also used or handles auth itself.
 */
export default function AdminRoute({ children }) {
    const { currentUser, isAdmin } = useAuth();

    if (!currentUser) {
        // Not logged in, redirect to login
        return <Navigate to="/auth/login" replace />;
    }

    if (!isAdmin) {
        // Logged in but not an admin, redirect to dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
