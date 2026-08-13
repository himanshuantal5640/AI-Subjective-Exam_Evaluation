import React from "react";
export default function TeacherStatCard({ title, value }) {
  return (
    <div className="bg-[#07100a] border border-green-500/10 p-6 rounded-xl shadow-md">
      <h3 className="text-gray-400 text-sm mb-2">{title}</h3>
      <p className="text-3xl font-bold text-green-400">{value}</p>
    </div>
  );
}