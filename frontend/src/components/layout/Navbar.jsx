


import React, { useState } from "react";
import { Zap, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useNavigate } from "react-router-dom";

export default function Navbar({ scrollToSection, refs }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (ref) => {
    scrollToSection(ref);
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-6 py-4">

        {/* Logo */}
        <button
          onClick={() => handleClick(refs.heroRef)}
          className="flex items-center gap-2 font-bold text-lg"
        >
          <Zap className="text-cyan-500" />
          <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
            NexusEval
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700 dark:text-white/70">
          <button onClick={() => handleClick(refs.heroRef)}>Home</button>
          <button onClick={() => handleClick(refs.portalsRef)}>Portals</button>
          <button onClick={() => handleClick(refs.featuresRef)}>Features</button>
          <button onClick={() => handleClick(refs.howRef)}>How</button>
          <button onClick={() => handleClick(refs.aiRef)}>AI</button>
          <button onClick={() => handleClick(refs.testimonialsRef)}>Reviews</button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <button onClick={()=>navigate('/signup')} className="hidden md:block px-5 py-2 rounded-lg bg-gradient-to-r cursor-pointer from-cyan-500 to-purple-500 text-white font-semibold hover:scale-105 transition">
            Get Started →
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden flex flex-col items-center gap-4 py-6 bg-white dark:bg-black border-t border-gray-200 dark:border-white/10">
          <button onClick={() => handleClick(refs.heroRef)}>Home</button>
          <button onClick={() => handleClick(refs.portalsRef)}>Portals</button>
          <button onClick={() => handleClick(refs.featuresRef)}>Features</button>
          <button onClick={() => handleClick(refs.howRef)}>How</button>
          <button onClick={() => handleClick(refs.aiRef)}>AI</button>
          <button onClick={() => handleClick(refs.testimonialsRef)}>Reviews</button>

          <button onClick={()=> navigate('/signup')} className=" cursor-pointer px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold">
            Get Started →
          </button>
        </div>
      )}
    </nav>
  );
}