import React from "react";
import { useState } from "react";
import { addQuestion } from "../../services/teacherService";
import toast from "react-hot-toast";

export default function QuestionBuilder({ examId }) {

  const [question, setQuestion] = useState("");
  const [marks, setMarks] = useState("");

  const handleAdd = async () => {
    try {
      await addQuestion({ examId, question, marks });
      toast.success("Question added");
      setQuestion("");
      setMarks("");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <div className="bg-[#07100a] border border-green-500/10 rounded-xl p-6 space-y-4">

      <textarea
        placeholder="Enter question..."
        value={question}
        onChange={(e)=>setQuestion(e.target.value)}
        className="w-full bg-[#0b1610] border border-green-500/10 rounded-lg p-3 text-white"
      />

      <input
        placeholder="Marks"
        value={marks}
        onChange={(e)=>setMarks(e.target.value)}
        className="w-32 bg-[#0b1610] border border-green-500/10 rounded-lg p-3 text-white"
      />

      <button
        onClick={handleAdd}
        className="bg-gradient-to-r from-green-400 to-emerald-500 text-black font-semibold px-6 py-3 rounded-lg"
      >
        Add Question
      </button>

    </div>
  );
}