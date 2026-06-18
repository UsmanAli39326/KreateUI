import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/Common/PageLoader";
import { useToast } from "./components/Common";
import { AnimatePresence, motion } from "framer-motion";

export default function Layout() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const handleForbidden = () => {
      toast.error("You don't have permission to do that.", "Access Denied");
    };
    window.addEventListener('api:forbidden', handleForbidden);
    return () => window.removeEventListener('api:forbidden', handleForbidden);
  }, [toast]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="min-h-dvh bg-background-main text-text-2 antialiased">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="page-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[9999] pointer-events-none"
          >
            <div className="pointer-events-auto w-full h-full">
              <PageLoader message="Loading..." />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      {/* offset for fixed navbar height */}
      <main className="pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
