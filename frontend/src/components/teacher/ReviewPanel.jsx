import React from "react";
import { useState } from "react";
import { overrideScore } from "../../services/teacherService";
import toast from "react-hot-toast";

export default function ReviewPanel({ submission }) {

  const [score, setScore] = useState(submission.score);

  const handleOverride = async () => {
    try {
      await overrideScore(submission._id, score);
      toast.success("Score updated");
    } catch {
      toast.error("Failed to update");
    }
  };

  return (
    <div className="bg-[#07100a] border border-green-500/10 rounded-xl p-6">

      <h3 className="text-green-400 font-semibold mb-4">
        {submission.student?.name}
      </h3>

      <p className="text-gray-400 mb-3">
        AI Score: {submission.score}
      </p>

      <div className="flex gap-3 items-center">

        <input
          type="number"
          value={score}
          onChange={(e)=>setScore(e.target.value)}
          className="w-24 bg-[#0b1610] border border-green-500/10 rounded-lg p-2 text-white"
        />

        <button
          onClick={handleOverride}
          className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
        >
          Override
        </button>

      </div>

    </div>
  );
}