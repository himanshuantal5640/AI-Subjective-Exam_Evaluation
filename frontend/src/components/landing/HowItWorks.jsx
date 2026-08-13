import React from "react";
import { PenLine, FileText, Brain, Trophy } from "lucide-react";
import SectionTag from "../ui/SectionTag";

export default function HowItWorks() {
  const steps = [
    {
      icon: <PenLine />,
      title: "Teacher Creates Exam",
      desc: "Build questions and publish instantly."
    },
    {
      icon: <FileText />,
      title: "Students Take Exam",
      desc: "Secure timed environment for submissions."
    },
    {
      icon: <Brain />,
      title: "AI Evaluates",
      desc: "Semantic grading with instant feedback."
    },
    {
      icon: <Trophy />,
      title: "Results Published",
      desc: "AI, Teacher & Hybrid scores displayed."
    }
  ];

  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-black text-center">
      <SectionTag>The Process</SectionTag>
      <h2 className="text-4xl font-bold mb-16">How It Works</h2>

      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {steps.map((s, i) => (
          <div key={i}>
            <div className="text-cyan-500 flex justify-center mb-4">
              {s.icon}
            </div>
            <h3 className="font-bold mb-2">{s.title}</h3>
            <p className="text-sm text-gray-600 dark:text-white/70">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}