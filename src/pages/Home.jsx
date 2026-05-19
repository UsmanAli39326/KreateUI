import TrustedBy from "../components/LandingPage/TrustedBy";
import Features from "../components/LandingPage/Features";
import CodeDemo from "../components/LandingPage/CodeDemo";
import FinalCTA from "../components/LandingPage/FinalCta";
import Hero from "../components/LandingPage/Hero";

export default function LandingPage() {
  return (
    <div className="bg-background-main text-text-2 antialiased font-[var(--font-body)]">
     <Hero/>
      <TrustedBy />
      <Features />
      <CodeDemo />
      <FinalCTA />
    </div>
  );
}
