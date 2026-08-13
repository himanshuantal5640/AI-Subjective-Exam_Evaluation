import React from "react";
import { Brain, BarChart3, Shield } from "lucide-react";

export default function Features() {
  const features = [
    { icon: <Brain />, title: "AI Semantic Grading" },
    { icon: <BarChart3 />, title: "Rich Dashboards" },
    { icon: <Shield />, title: "Enterprise Security" }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-black">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-white dark:bg-[#111] shadow-md"
          >
            <div className="text-cyan-500 mb-4">{f.icon}</div>
            <h3 className="text-lg font-bold">{f.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}