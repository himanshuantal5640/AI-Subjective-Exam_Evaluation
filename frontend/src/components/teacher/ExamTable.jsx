import React from "react";
import { Link } from "react-router-dom";

export default function ExamTable({ exam }) {

  return (
    <div className="bg-[#07100a] border border-green-500/10 rounded-xl p-6 hover:border-green-400/40 transition">

      <h3 className="text-lg font-semibold text-green-400 mb-2">
        {exam.title}
      </h3>

      <p className="text-gray-400 text-sm mb-2">
        Duration: {exam.duration} mins
      </p>

      <p className="text-gray-400 text-sm mb-4">
        Total Marks: {exam.totalMarks}
      </p>

      <div className="flex gap-3">

        <Link
          to={`/teacher/review/${exam._id}`}
          className="bg-green-500 text-black px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Review
        </Link>

        <Link
          to={`/teacher/analytics/${exam._id}`}
          className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm"
        >
          Analytics
        </Link>

      </div>

    </div>
  );
}