import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <div className="min-h-dvh bg-background-main text-text-2 antialiased">
      <Navbar />

      {/* offset for fixed navbar height */}
      <main className="pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
