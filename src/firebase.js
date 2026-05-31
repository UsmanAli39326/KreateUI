// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBChY3oH9FD7AtPfekbIloEgP3BiMP7u_Q",
    authDomain: "kreate-ui.firebaseapp.com",
    projectId: "kreate-ui",
    storageBucket: "kreate-ui.firebasestorage.app",
    messagingSenderId: "980799197048",
    appId: "1:980799197048:web:3c83e95b50285c7cec428d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
import { getFirestore } from "firebase/firestore";
export const db = getFirestore(app);
