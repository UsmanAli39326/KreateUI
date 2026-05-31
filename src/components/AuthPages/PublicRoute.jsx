import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * PublicRoute prevents authenticated users from accessing public-only pages 
 * like Login and Sign Up.
 */
export default function PublicRoute({ children }) {
    const { currentUser } = useAuth();

    if (currentUser) {
        // If logged in, redirect to dashboard
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
