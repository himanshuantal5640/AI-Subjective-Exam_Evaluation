import React from "react";
import { GraduationCap, BookOpen, Shield } from "lucide-react";
import GlowCard from "../ui/GlowCard";
import SectionTag from "../ui/SectionTag";

export default function Portals() {
  const portals = [
    {
      icon: <GraduationCap className="text-cyan-500" />,
      title: "Student Portal",
      desc: "Take exams, track AI & teacher scores, view performance charts."
    },
    {
      icon: <BookOpen className="text-green-500" />,
      title: "Teacher Portal",
      desc: "Create exams, review AI grading, override scores."
    },
    {
      icon: <Shield className="text-purple-500" />,
      title: "Admin Portal",
      desc: "Manage users, monitor system analytics, audit logs."
    }
  ];

  return (
    <section className="py-24 px-6 text-center">
      <SectionTag>Three Smart Portals</SectionTag>
      <h2 className="text-4xl font-bold mb-12">
        One Platform for Every Role
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {portals.map((p, i) => (
          <GlowCard key={i}>
            <div className="text-4xl mb-4 flex justify-center">{p.icon}</div>
            <h3 className="text-xl font-bold mb-2">{p.title}</h3>
            <p className="text-gray-600 dark:text-white/70 text-sm">
              {p.desc}
            </p>
          </GlowCard>
        ))}
      </div>
    </section>
  );
}