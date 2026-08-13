import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAvailableExams } from "../../services/studentService";
import { useTheme } from "../../context/ThemeContext";
import { Zap, Clock, Book, AlertCircle, ChevronRight, Hash } from "lucide-react";

export default function StudentExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const { data } = await getAvailableExams();
      setExams(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className={`text-3xl font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
            Assessment Nodes
          </h1>
          <p className={`text-sm font-['JetBrains_Mono'] ${darkMode ? 'text-blue-500/40' : 'text-gray-500'} mt-2 uppercase tracking-widest`}>
            Available Evaluation Protocols
          </p>
        </div>
        <div className={`px-5 py-2 rounded-2xl ${darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'} border flex items-center gap-3`}>
           <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
           <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 font-['Orbitron']">Network: Synchronized</span>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-6">
           <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-500/20 rounded-full"></div>
              <div className="absolute top-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
           </div>
           <p className="text-[10px] uppercase tracking-[4px] font-black text-blue-500/40 font-['JetBrains_Mono'] animate-pulse">Scanning Neural Network...</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {exams.length === 0 ? (
            <div className={`p-24 text-center ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-blue-100'} rounded-[40px] border shadow-2xl`}>
              <div className="mb-6 flex justify-center opacity-10"><Zap size={64} /></div>
              <p className="text-sm font-black uppercase tracking-[4px] text-gray-500 font-['Orbitron']">No Active Nodes</p>
              <p className="text-xs text-blue-500/40 mt-4 font-['JetBrains_Mono'] uppercase tracking-widest">All protocols are currently inactive.</p>
            </div>
          ) : (
            exams.map((exam) => (
              <div
                key={exam._id}
                className={`group relative overflow-hidden transition-all duration-500 hover:scale-[1.01] ${
                  darkMode 
                    ? 'bg-[#0d1825]/80 border-blue-500/10 shadow-2xl' 
                    : 'bg-white border-blue-100 shadow-xl'
                } backdrop-blur-xl border rounded-[32px] p-8 font-['JetBrains_Mono']`}
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-blue-500/10 transition-all duration-700"></div>

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                       <span className={`px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[9px] font-black tracking-widest text-blue-400 font-['Orbitron']`}>
                        {exam.subject || 'GENERAL_CORE'}
                       </span>
                       <div className="flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
                          <Hash size={12} className="text-blue-500/40" /> {exam._id.slice(-8)}
                       </div>
                    </div>
                    
                    <h3 className={`text-2xl font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-blue-900'} tracking-tight group-hover:text-blue-500 transition-colors`}>
                      {exam.title}
                    </h3>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
                       <div className="flex items-center gap-2">
                          <Clock size={14} className="text-blue-500" />
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{exam.duration} Min Duration</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Book size={14} className="text-blue-500" />
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{exam.totalMarks} Points Max</span>
                       </div>
                       {exam.deadline && (
                          <div className="flex items-center gap-2 text-amber-500/60">
                             <AlertCircle size={14} />
                             <span className="text-[10px] font-bold uppercase tracking-widest">Cutoff: {new Date(exam.deadline).toLocaleDateString()}</span>
                          </div>
                       )}
                    </div>
                  </div>

                  <button
                    onClick={() => !exam.isSubmitted && navigate(`/student/exam/${exam._id}/take`)}
                    disabled={exam.isSubmitted}
                    className={`relative w-full md:w-auto px-10 py-4 rounded-[20px] font-bold font-['Orbitron'] text-[10px] uppercase tracking-[3px] transition-all group/btn active:scale-95 shadow-2xl ${
                      exam.isSubmitted 
                        ? "bg-gray-400 cursor-not-allowed text-gray-700 opacity-20" 
                        : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20 overflow-hidden"
                    }`}
                  >
                    {exam.isSubmitted ? "Protocol Complete" : (
                      <>
                        <span className="relative z-10 flex items-center gap-3">
                           Initialize Link <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}