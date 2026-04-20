/* ============================================================
   HOME PAGE — /app/page.tsx
   ============================================================
   This is the main home page that assembles all sections.
   Add more sections below LogosStrip as you build them out.
   ============================================================ */

import HeroSection from "@/components/sections/HeroSection";
import LogosStrip from "@/components/sections/LogosStrip";
import Bookage  from "@/components/sections/Bookage";
import Lead from "@/components/sections/Lead";
import Team from "@/components/sections/Team";
import System from "@/components/sections/System";
import Footer from "@/components/layout/Footer"
import BlogSection from "@/components/sections/BlogSection"


export default function HomePage() {
  return (
    <main>
      {/* Hero — full viewport height with bg image + quote form */}
      <HeroSection />

      {/* Partner logos strip */}
      <LogosStrip />
      <Bookage/>
      <Lead/>
      <Team/>
      <System/>
      <BlogSection/>
      <Footer/>
      

      {/* 
        ADD MORE SECTIONS HERE as you build them:
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
        <Footer />
      */}
    </main>
  );
}
