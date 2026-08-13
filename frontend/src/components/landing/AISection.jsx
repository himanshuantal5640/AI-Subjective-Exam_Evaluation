import React from "react";
import { Cpu, MessageSquareText, Target } from "lucide-react";
import SectionTag from "../ui/SectionTag";
import GlowCard from "../ui/GlowCard";

export default function AISection() {
  return (
    <section className="py-24 px-6 text-center">
      <SectionTag>AI Engine — NexusAI v3</SectionTag>
      <h2 className="text-4xl font-bold mb-12">
        Evaluation Powered by AI
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <GlowCard>
          <Cpu className="text-cyan-500 mb-4" />
          <h3 className="font-bold mb-2">Semantic Understanding</h3>
          <p className="text-sm text-gray-600 dark:text-white/70">
            Understands context, synonyms, and conceptual equivalence.
          </p>
        </GlowCard>

        <GlowCard>
          <MessageSquareText className="text-green-500 mb-4" />
          <h3 className="font-bold mb-2">Explainable Feedback</h3>
          <p className="text-sm text-gray-600 dark:text-white/70">
            Every score includes detailed reasoning.
          </p>
        </GlowCard>

        <GlowCard>
          <Target className="text-purple-500 mb-4" />
          <h3 className="font-bold mb-2">Confidence Scoring</h3>
          <p className="text-sm text-gray-600 dark:text-white/70">
            Low-confidence answers flagged for review.
          </p>
        </GlowCard>
      </div>
    </section>
  );
}