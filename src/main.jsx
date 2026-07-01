import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Layout from "./layout.jsx";
import App from "./App.jsx";
import Login from "./pages/auth/Login.jsx";
import OverviewPage from "./pages/dashboard/OverviewPage.jsx";
import AnalyzePage from "./pages/dashboard/AnalyzePage.jsx";
import AnalyzeInProgressPage from "./pages/dashboard/AnalyzeInProgressPage.jsx";
import AnalysisResultsPage from "./pages/dashboard/AnalysisResultsPage.jsx";
import FixIssuePage from "./pages/dashboard/FixIssuePage.jsx";
import ReportsPage from "./pages/dashboard/ReportsPage.jsx";
import SettingsPage from "./pages/dashboard/SettingsPage.jsx";
import ProjectsPage from "./pages/dashboard/ProjectsPage.jsx";
import AdminPage from "./pages/dashboard/AdminPage.jsx";
import IssuesPage from "./pages/dashboard/IssuesPage.jsx";
import AboutContent from "./pages/About.jsx";
import ContactPageContent from "./pages/ContactPage.jsx";
import MarketplacePage from "./pages/MarketplacePage.jsx";
import TemplateDetailPage from "./pages/TemplateDetailPage.jsx";
import DocumentationPage from "./pages/DocumentationPage.jsx";
// import PricingPage from "./pages/PricingPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/Common/ProtectedRoute.jsx";
import PublicRoute from "./components/AuthPages/PublicRoute.jsx";
import { ToastProvider, PageLoader } from "./components/Common";

import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.jsx";
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
      { path: "/marketplace/:templateId", element: <TemplateDetailPage /> },
      { path: "/documentation", element: <DocumentationPage /> },
      { path: "/docs", element: <DocumentationPage /> },
      // { path: "/pricing", element: <PricingPage /> },
      // Dashboard routes nested under Layout
      // add more app pages here
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <OverviewPage /> }, // Default dashboard page
      { path: "analyze", element: <AnalyzePage /> },
      { path: "analyze/progress", element: <AnalyzeInProgressPage /> },
      { path: "analyze/results", element: <AnalysisResultsPage /> },
      { path: "fix", element: <FixIssuePage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "projects", element: <ProjectsPage /> }, // Add ProjectsPage route
      { path: "issues", element: <IssuesPage /> },
      { path: "admin", element: <AdminPage /> },
    ],
  },

  // Routes WITHOUT Layout
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PublicRoute>
        <ForgotPasswordPage />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <React.Suspense fallback={<PageLoader message="Loading..." isFullScreen={true} />}>
          <SignUpPage />
        </React.Suspense>
      </PublicRoute>
    ),
  },
  // {
  //   path: "/dashboard",
  //   element: <OverviewPage />,
  // },
  // {
  //   path: "/dashboard/analyze",
  //   element: <AnalyzePage />,
  // },
  // {
  //   path: "/dashboard/analyze/progress",
  //   element: <AnalyzeInProgressPage />,
  // },
  // {
  //   path: "/dashboard/analyze/results",
  //   element: <AnalysisResultsPage />,
  // },
  // {
  //   path: "/dashboard/fix",
  //   element: <FixIssuePage />,
  // },
  // {
  //   path: "/dashboard/reports",
  //   element: <ReportsPage />,
  // },
  // {
  //   path: "/dashboard/settings",
  //   element: <SettingsPage />,
  // },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);

