import React from "react";
import SectionTag from "../ui/SectionTag";
import GlowCard from "../ui/GlowCard";

export default function Testimonials() {
  const reviews = [
    {
      text: "Reduced grading time by 80%. AI grading is extremely accurate.",
      name: "Prof. Sharma"
    },
    {
      text: "Love comparing AI, Teacher and Hybrid scores!",
      name: "Arjun Kumar"
    },
    {
      text: "Admin dashboard gives full visibility and control.",
      name: "Dr. Mehta"
    }
  ];

  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-black text-center">
      <SectionTag>What People Say</SectionTag>
      <h2 className="text-4xl font-bold mb-12">
        Loved by Educators
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {reviews.map((r, i) => (
          <GlowCard key={i}>
            <p className="italic text-sm text-gray-600 dark:text-white/70 mb-4">
              "{r.text}"
            </p>
            <h4 className="font-semibold">{r.name}</h4>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}