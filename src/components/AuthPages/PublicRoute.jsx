import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PageLoader from "../Common/PageLoader";

/**
 * PublicRoute prevents authenticated users from accessing public-only pages 
 * like Login and Sign Up.
 */
export default function PublicRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <PageLoader message="Loading..." isFullScreen={true} />;
    }

    if (user) {
        // If logged in, redirect to dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
