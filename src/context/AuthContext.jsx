import React, { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile
} from "firebase/auth";
import { auth } from "../firebase";
import mockAdminData from "../assets/api/mockAdminData.json";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock role fetching based on email
    // In a real app, this would be a Firestore lookup or custom claim
    const fetchUserRole = (email) => {
        if (!email) return "user";
        // Check if user is in mock admin data
        const foundUser = mockAdminData.users.find(u => u.email === email);
        return foundUser ? foundUser.role : "user";
    };

    // Sign up function
    function signup(email, password, fullName) {
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Update profile with full name if provided
            if (fullName) {
                updateProfile(userCredential.user, {
                    displayName: fullName
                });
            }
        });
    }

    // Login function
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Logout function
    function logout() {
        return signOut(auth);
    }

    // Reset password function
    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    // Subscribe to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            if (user) {
                setUserRole(fetchUserRole(user.email));
            } else {
                setUserRole(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        userRole,
        isAdmin: userRole === "admin",
        signup,
        login,
        logout,
        resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
