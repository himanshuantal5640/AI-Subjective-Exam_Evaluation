import React from "react";
import CountUp from "../ui/CountUp";

export default function Stats() {
  return (
    <section className="py-20 text-center">
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div>
          <h2 className="text-4xl font-bold text-cyan-500">
            <CountUp target={1248} />
          </h2>
          <p>AI Evaluations</p>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-purple-500">
            <CountUp target={96} />%
          </h2>
          <p>Accuracy</p>
        </div>
        <div>
          <h2 className="text-4xl font-bold text-green-500">
            <CountUp target={24} />
          </h2>
          <p>Active Exams</p>
        </div>
      </div>
    </section>
  );
}