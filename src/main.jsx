import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./index.css";
import Layout from "./layout.jsx";
import App from "./App.jsx";
import Login from "./pages/auth/Login.jsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.jsx";
import ProtectedRoute from "./components/AuthPages/ProtectedRoute.jsx";
import AdminRoute from "./components/AuthPages/AdminRoute.jsx";
import PublicRoute from "./components/AuthPages/PublicRoute.jsx";
import OverviewPage from "./pages/dashboard/OverviewPage.jsx";
import AnalyzePage from "./pages/dashboard/AnalyzePage.jsx";
import AnalyzeInProgressPage from "./pages/dashboard/AnalyzeInProgressPage.jsx";
import AnalysisResultsPage from "./pages/dashboard/AnalysisResultsPage.jsx";
import FixIssuePage from "./pages/dashboard/FixIssuePage.jsx";
import ReportsPage from "./pages/dashboard/ReportsPage.jsx";
import SettingsPage from "./pages/dashboard/SettingsPage.jsx";
import ProjectsPage from "./pages/dashboard/ProjectsPage.jsx";
import AboutContent from "./pages/About.jsx";
import ContactPageContent from "./pages/ContactPage.jsx";
import MarketplacePage from "./pages/MarketplacePage.jsx";
import TemplateDetailPage from "./pages/TemplateDetailPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import UserManagementPage from "./pages/admin/UserManagementPage.jsx";
import ModerationPage from "./pages/admin/ModerationPage.jsx";
import SubmitTemplatePage from "./pages/SubmitTemplatePage.jsx";
import ReportsHistoryPage from "./pages/dashboard/ReportsHistoryPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import SecurityPage from "./pages/SecurityPage.jsx";
import StatusPage from "./pages/StatusPage.jsx";
import DocsPage from "./pages/DocsPage.jsx";
import FeaturesPage from "./pages/FeaturesPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import SupportPage from "./pages/SupportPage.jsx";

const SignUpPage = React.lazy(() => import("./pages/auth/SignUpPage.jsx"));

const router = createBrowserRouter([
  // Routes WITH Layout
  {
    element: <Layout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/about", element: <AboutContent /> },
      { path: "/contact", element: <ContactPageContent /> },
      { path: "/marketplace", element: <MarketplacePage /> },
      { path: "/marketplace/submit", element: <SubmitTemplatePage /> },
      { path: "/marketplace/:templateId", element: <TemplateDetailPage /> },
      { path: "/pricing", element: <PricingPage /> },
      { path: "/privacy", element: <PrivacyPage /> },
      { path: "/security", element: <SecurityPage /> },
      { path: "/status", element: <StatusPage /> },
      { path: "/docs", element: <DocsPage /> },
      { path: "/features", element: <FeaturesPage /> },
      { path: "/terms", element: <TermsPage /> },
      { path: "/support", element: <SupportPage /> },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute><Outlet /></ProtectedRoute>,
    children: [
      { index: true, element: <OverviewPage /> }, // Default dashboard page
      { path: "analyze", element: <AnalyzePage /> },
      { path: "analyze/progress", element: <AnalyzeInProgressPage /> },
      { path: "analyze/results", element: <AnalysisResultsPage /> },
      { path: "fix", element: <FixIssuePage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "reports/history", element: <ReportsHistoryPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "projects", element: <ProjectsPage /> },

      // Admin Routes protected by AdminRoute
      {
        path: "admin/users",
        element: <AdminRoute><UserManagementPage /></AdminRoute>
      },
      {
        path: "admin/moderation",
        element: <AdminRoute><ModerationPage /></AdminRoute>
      },
    ],
  },
  {
    path: "/auth",
    element: <PublicRoute><Outlet /></PublicRoute>,
    children: [
      { path: "login", element: <Login /> },
      {
        path: "register", element: (
          <React.Suspense fallback={<div>Loading...</div>}>
            <SignUpPage />
          </React.Suspense>
        )
      },
      { path: "reset", element: <ForgotPasswordPage /> },
    ]
  },
]);

import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
