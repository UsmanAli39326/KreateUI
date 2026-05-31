import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { currentUser } = useAuth();
    const location = useLocation();

    if (!currentUser) {
        // Redirect to login page, saving the attempted location
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return children;
}
