import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Layout from "./layout.jsx";
import App from "./App.jsx";
import Login from "./pages/auth/login.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import AboutContent from "./pages/About.jsx";
import ContactPageContent from "./pages/ContactPage.jsx";


const SignUpPage = React.lazy(() => import("./pages/auth/SignUpPage.jsx"));

const router = createBrowserRouter([
  // ─────────────────────
  // Routes WITH Layout
  // ─────────────────────
  {
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/about", element: <AboutContent /> },
      { path: "/contact", element: <ContactPageContent /> },
      // add more app pages here
    ],
  },

  // ─────────────────────
  // Routes WITHOUT Layout
  // ─────────────────────
  {
    path: "/auth",
    element: <Login />,
  }, {

    path: "/signup",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <SignUpPage />
      </React.Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <DashboardPage />
      </React.Suspense>
    ),
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
