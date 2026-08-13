import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyExams, toggleExamStatus } from "../../services/teacherService";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import { Edit, Trash, Eye, Users, CheckCircle, Clock, Plus, BarChart2 } from "lucide-react";

export default function ManageExams() {
  const { darkMode } = useTheme();
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const fetchExams = () => {
    getMyExams().then(res => setExams(res.data)).catch(() => toast.error("Failed to fetch exams"));
  }

  useEffect(() => {
    fetchExams();
  }, []);

  const handleToggleStatus = async (examId) => {
    try {
      await toggleExamStatus(examId);
      toast.success("Exam status updated!");
      fetchExams();
    } catch (err) {
      toast.error("Failed to update status");
    }
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className={`text-3xl font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
            Deployment Registry
          </h1>
          <p className={`text-sm font-['JetBrains_Mono'] ${darkMode ? 'text-emerald-500/40' : 'text-gray-500'} mt-2 uppercase tracking-widest`}>
            Monitoring Active Assessment Nodes
          </p>
        </div>
        <button 
          onClick={() => navigate('/teacher/create')}
          className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-[20px] font-bold text-xs uppercase tracking-[2px] transition-all shadow-xl shadow-emerald-600/20 active:scale-95 font-['Orbitron']"
        >
          <Plus size={18} /> New Deployment
        </button>
      </div>

      <div className={`${darkMode ? 'bg-[#08150f]/80 border-emerald-500/10 shadow-2xl' : 'bg-white border-gray-200 shadow-xl'} backdrop-blur-xl rounded-[32px] border overflow-hidden transition-all duration-500`}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className={`${darkMode ? 'bg-black/40 text-emerald-400 border-emerald-500/10' : 'bg-gray-50 text-gray-700 border-gray-100'} border-b font-['Orbitron']`}>
                <th className="p-6 text-left text-[10px] font-black uppercase tracking-[3px]">Node Signature</th>
                <th className="p-6 text-center text-[10px] font-black uppercase tracking-[3px]">Status</th>
                <th className="p-6 text-center text-[10px] font-black uppercase tracking-[3px]">Deadline</th>
                <th className="p-6 text-center text-[10px] font-black uppercase tracking-[3px]">Quota</th>
                <th className="p-6 text-right text-[10px] font-black uppercase tracking-[3px]">Command</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/5 font-['JetBrains_Mono']">
              {exams.map(exam => (
                <tr key={exam._id} className={`${darkMode ? 'text-emerald-100/60 hover:bg-emerald-500/5' : 'text-gray-700 hover:bg-gray-50'} transition-all duration-300 group`}>
                  <td className="p-6">
                    <div className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-900'} font-['Orbitron'] tracking-tight group-hover:text-emerald-500 transition-colors`}>{exam.title}</div>
                    <div className={`text-[10px] ${darkMode ? 'text-gray-600' : 'text-gray-400'} mt-1 uppercase tracking-widest`}>ID: {exam._id.slice(-8)} • {exam.subject || 'GENERAL'}</div>
                  </td>
                  <td className="p-6 text-center">
                    <button
                      onClick={() => handleToggleStatus(exam._id)}
                      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                        exam.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
                          : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${exam.status === "active" ? 'bg-emerald-500 animate-pulse' : 'bg-gray-500'}`}></div>
                      {exam.status}
                    </button>
                  </td>
                  <td className="p-6 text-center">
                    <div className="flex flex-col items-center">
                       <span className={`text-[11px] font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                         {exam.deadline ? new Date(exam.deadline).toLocaleDateString() : 'N/A'}
                       </span>
                       <span className={`text-[9px] ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                         {exam.deadline ? new Date(exam.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                       </span>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className={`px-3 py-1 rounded-lg border text-xs font-bold ${
                      darkMode ? 'bg-black/20 border-white/5 text-emerald-400' : 'bg-gray-50 border-gray-200 text-gray-900'
                    }`}>
                      {exam.totalMarks} <span className="text-[8px] opacity-40">PTS</span>
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex justify-end gap-3">
                      {[
                        { icon: <Eye size={16} />, title: "Review", path: `/teacher/review/${exam._id}`, color: "text-amber-400 bg-amber-400/10" },
                        { icon: <BarChart2 size={16} />, title: "Stats", path: `/teacher/analytics/${exam._id}`, color: "text-blue-400 bg-blue-400/10" },
                        { icon: <Users size={16} />, title: "Roster", path: `/teacher/attendance/${exam._id}`, color: "text-indigo-400 bg-indigo-400/10" },
                        { icon: <Edit size={16} />, title: "Modify", path: `/teacher/exam/${exam._id}/questions`, color: "text-emerald-400 bg-emerald-400/10" }
                      ].map((action, idx) => (
                        <button
                          key={idx}
                          title={action.title}
                          onClick={() => navigate(action.path)}
                          className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 active:scale-95 border border-transparent hover:border-current ${action.color}`}
                        >
                          {action.icon}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {exams.length === 0 && (
            <div className={`p-24 text-center ${darkMode ? 'text-gray-600' : 'text-gray-400'} font-['Orbitron']`}>
              <div className="mb-6 flex justify-center opacity-10"><Plus size={64} /></div>
              <p className="text-sm uppercase tracking-widest font-black">No Active Deployments</p>
              <button 
                onClick={() => navigate('/teacher/create')}
                className="mt-6 text-emerald-500 hover:text-emerald-400 text-xs font-black uppercase tracking-widest border-b border-emerald-500/20 pb-1 transition-all"
              >
                Initialize Primary Node
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}