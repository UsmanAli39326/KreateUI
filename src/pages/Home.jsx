import TrustedBy from "../components/LandingPage/TrustedBy";
import Features from "../components/LandingPage/Features";
import Showcase from "../components/LandingPage/Showcase";
// import AICapabilities from "../components/LandingPage/AICapabilities";


import FAQ from "../components/LandingPage/FAQ";
import FinalCTA from "../components/LandingPage/FinalCta";
import Hero from "../components/LandingPage/Hero";
import Workflow from "../components/LandingPage/Workflow";

export default function LandingPage() {
  return (
    <div className="bg-background-main text-text-2 antialiased font-[var(--font-body)]">
      <Hero />
      <Workflow />
      <TrustedBy />
      <Features />
      <Showcase />
      {/* <AICapabilities /> */}


      <FAQ />
      <FinalCTA />
    </div>
  );
}
