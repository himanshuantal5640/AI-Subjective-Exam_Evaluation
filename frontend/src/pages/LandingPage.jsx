
import React from "react";
import { useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import Portals from "../components/landing/Portals";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import AISection from "../components/landing/AISection";
import Testimonials from "../components/landing/Testimonials";
import CTA from "../components/landing/CTA";
import Footer from "../components/layout/Footer";

export default function LandingPage() {
  const heroRef = useRef(null);
  const portalsRef = useRef(null);
  const featuresRef = useRef(null);
  const howRef = useRef(null);
  const aiRef = useRef(null);
  const testimonialsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-white dark:bg-[#010308] text-gray-900 dark:text-white min-h-screen">

      <Navbar
        scrollToSection={scrollToSection}
        refs={{
          heroRef,
          portalsRef,
          featuresRef,
          howRef,
          aiRef,
          testimonialsRef
        }}
      />

      <div ref={heroRef}>
        <Hero />
      </div>

      <div ref={portalsRef}>
        <Portals />
      </div>

      <div ref={featuresRef}>
        <Features />
      </div>

      <div ref={howRef}>
        <HowItWorks />
      </div>

      <div ref={aiRef}>
        <AISection />
      </div>

      <div ref={testimonialsRef}>
        <Testimonials />
      </div>

      <CTA />
      <Footer />
    </div>
  );
}