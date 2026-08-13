
import React from "react";
export default function StudentCard({ student }) {

  return (
    <div className="bg-[#07100a] border border-green-500/10 rounded-xl p-6 hover:border-green-400/40 transition">

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-green-400">
          {student.name}
        </h3>
        <span className="text-xs bg-green-500/10 text-green-400 px-3 py-1 rounded-full">
          Student
        </span>
      </div>

      <p className="text-gray-400 text-sm mb-2">
        Email: {student.email}
      </p>

      <p className="text-gray-400 text-sm">
        Department: {student.department || "N/A"}
      </p>

    </div>
  );
}