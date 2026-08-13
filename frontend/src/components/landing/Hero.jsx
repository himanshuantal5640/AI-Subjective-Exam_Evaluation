import React from "react";
import { useNavigate } from "react-router-dom";
export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-28 md:pt-32">
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
        <span className="block">Exam Intelligence</span>
        <span className="block bg-gradient-to-r from-cyan-500 via-purple-500 to-green-400 bg-clip-text text-transparent">
          Redefined
        </span>
      </h1>

      <p className="max-w-lg text-gray-600 dark:text-white/70 mt-6 text-sm sm:text-base">
        AI precision meets human expertise. Evaluate exams faster,
        fairer and smarter.
      </p>

      <button onClick={()=>navigate('/signup')} className="cursor-pointer mt-8 px-6 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold">
        Get Started
      </button>
    </section>
  );
}