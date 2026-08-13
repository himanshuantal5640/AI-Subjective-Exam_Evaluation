import React from "react";
import { useNavigate } from "react-router-dom";
export default function CTA() {
  const navigate = useNavigate();
  return (
    <section className="py-20 text-center">
      <h2 className="text-4xl font-bold mb-6">
        Ready to Transform Exams?
      </h2>
      <button  onClick={()=> navigate('/signup')} className="cursor-pointer px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold">
        Get Started Free
      </button>
    </section>
  );
}