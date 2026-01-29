import TrustedBy from "../components/LandingPage/TrustedBy";
import Features from "../components/LandingPage/Features";
import CodeDemo from "../components/LandingPage/CodeDemo";
import FinalCTA from "../components/LandingPage/FinalCta";
import Hero from "../components/LandingPage/Hero";

export default function LandingPage() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
     <Hero/>
      <TrustedBy />
      <Features />
      <CodeDemo />
      <FinalCTA />

      {/* <Footer /> */}
    </div>
  );
}
