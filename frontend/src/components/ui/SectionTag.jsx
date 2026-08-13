import React from "react";
export default function SectionTag({ children }) {
  return (
    <div className="text-xs uppercase tracking-widest text-cyan-500 font-semibold mb-4">
      {children}
    </div>
  );
}