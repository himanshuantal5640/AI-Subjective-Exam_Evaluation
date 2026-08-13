import React from "react";
export default function AuthCard({ children, title }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white dark:bg-[#010308]">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10">
        <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}