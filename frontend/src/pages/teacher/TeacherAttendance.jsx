import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExamAttendance, markAttendance } from "../../services/teacherService";
import toast from "react-hot-toast";

export default function TeacherAttendance() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = async () => {
    try {
      const { data } = await getExamAttendance(examId);
      setStudents(data);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load attendance records");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [examId]);

  const toggleAttendance = async (studentId, currentStatus) => {
    const newStatus = currentStatus === "present" ? "absent" : "present";
    try {
      await markAttendance(examId, studentId, newStatus);
      toast.success("Attendance updated");
      fetchAttendance(); // refresh
    } catch (err) {
      toast.error("Failed to update attendance");
    }
  };

  if (loading) return <div className="p-6 text-white text-center">Loading...</div>;

  const presentCount = students.filter(s => s.status === "present").length;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Class Attendance</h2>
          <div className="text-gray-400 text-sm">
            Total Enrolled: {students.length} | Present: {presentCount}
          </div>
        </div>
        <button
          onClick={() => navigate("/teacher/manage")}
          className="px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-800 transition"
        >
          Back to Exams
        </button>
      </div>

      <div className="bg-[#07100a] rounded-xl border border-green-500/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#0b1610] text-green-400">
            <tr>
              <th className="p-4 text-left">Student Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(({ student, status }) => (
              <tr key={student._id} className="border-t border-green-500/10 text-gray-300 hover:bg-green-500/5 transition">
                <td className="p-4 font-medium">{student.name}</td>
                <td className="p-4 text-sm text-gray-500">{student.email}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    status === "present" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                  }`}>
                    {status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => toggleAttendance(student._id, status)}
                    className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 rounded text-xs transition"
                  >
                    Mark {status === "present" ? "Absent" : "Present"}
                  </button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
