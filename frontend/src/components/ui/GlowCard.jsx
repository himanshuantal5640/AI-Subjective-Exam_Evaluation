import React from "react";
export default function GlowCard({ children }) {
  return (
    <div className="relative p-6 rounded-2xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 backdrop-blur-lg shadow-lg hover:shadow-cyan-500/20 transition-all duration-300">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 hover:opacity-20 blur-xl rounded-2xl transition-all duration-300"></div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}