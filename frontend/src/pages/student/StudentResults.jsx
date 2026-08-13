import React, { useEffect, useState } from "react";
import { getMyResults } from "../../services/answerService";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import { Award, Cpu, User, Layers, ChevronRight, Activity, Search } from "lucide-react";

export default function StudentResults() {
  const { darkMode } = useTheme();
  const [examResults, setExamResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const { data } = await getMyResults();
      
      const grouped = {};
      data.forEach(r => {
        const examId = r.examId?._id || r.examId || "unknown";
        const examTitle = r.examId?.title || "Unknown Exam";
        
        if (!grouped[examId]) {
          grouped[examId] = {
            examId,
            examTitle,
            aiScore: 0,
            teacherScore: 0,
            hybridScore: 0,
            questionCount: 0,
            totalPossible: 0
          };
        }
        
        grouped[examId].aiScore += r.aiFinalScore || 0;
        grouped[examId].teacherScore += r.teacherFinalScore || 0;
        grouped[examId].hybridScore += r.hybridFinalScore || r.score || 0;
        grouped[examId].questionCount += 1;
        grouped[examId].totalPossible += r.questionId?.totalMarks || r.examId?.totalMarks || 100;
      });

      setExamResults(Object.values(grouped));
    } catch {
      toast.error("Failed to load results");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className={`text-3xl font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
            Achievement Ledger
          </h1>
          <p className={`text-sm font-['JetBrains_Mono'] ${darkMode ? 'text-blue-500/40' : 'text-gray-500'} mt-2 uppercase tracking-widest`}>
            Synchronized Evaluation Matrix
          </p>
        </div>
        <div className={`px-5 py-2 rounded-2xl ${darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'} border flex items-center gap-3`}>
           <Activity size={16} className="text-blue-500" />
           <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 font-['Orbitron']">Live Sync: Active</span>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 space-y-4">
           <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
           <p className="text-[10px] uppercase tracking-[4px] font-black text-blue-500/40 font-['JetBrains_Mono']">Accessing Secure Archives...</p>
        </div>
      ) : examResults.length === 0 ? (
        <div className={`p-32 text-center ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-blue-100'} rounded-[40px] border shadow-2xl`}>
          <div className="mb-6 flex justify-center opacity-10"><Award size={80} /></div>
          <p className="text-sm font-black uppercase tracking-[4px] text-gray-500 font-['Orbitron']">No Data Vectors Found</p>
          <p className="text-xs text-blue-500/40 mt-4 font-['JetBrains_Mono'] uppercase tracking-widest">Complete an assessment to initialize records.</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {examResults.map((r, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden ${darkMode ? 'bg-[#0d1825]/80 border-blue-500/10 shadow-2xl' : 'bg-white border-blue-100 shadow-xl'} backdrop-blur-xl border rounded-[40px] p-10 transition-all duration-500 hover:scale-[1.01] hover:border-blue-500/30 font-['JetBrains_Mono']`}
            >
              {/* Animated Accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-blue-500/10 transition-all duration-700"></div>

              <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-10">
                {/* Info Section */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                     <span className={`text-[10px] font-black uppercase tracking-[3px] ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>Node Analysis</span>
                  </div>
                  <h3 className={`text-2xl font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-blue-900'} tracking-tight group-hover:text-blue-500 transition-colors`}>
                    {r.examTitle}
                  </h3>
                  <p className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} mt-3 uppercase tracking-widest font-bold`}>
                     {r.questionCount} Questions Resolved • Finalized Status
                  </p>
                  
                  <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                     <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-blue-50/50'}`}>
                        <p className="text-[8px] font-black text-blue-500/60 uppercase mb-2">Total Points</p>
                        <p className="text-lg font-black font-['Orbitron']">{r.totalPossible}</p>
                     </div>
                     <div className={`p-4 rounded-2xl border ${darkMode ? 'bg-blue-500/10 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-blue-50 border-blue-100'}`}>
                        <p className="text-[8px] font-black text-blue-500 uppercase mb-2">Final Hybrid</p>
                        <p className="text-lg font-black font-['Orbitron'] text-blue-500">{r.hybridScore}</p>
                     </div>
                  </div>
                </div>

                {/* Score Breakdown Section */}
                <div className={`lg:w-96 flex flex-col gap-4 p-6 rounded-[32px] ${darkMode ? 'bg-black/40 border border-white/5' : 'bg-blue-50/50 border border-blue-100'}`}>
                   <h4 className="text-[10px] font-black uppercase tracking-[4px] text-blue-500 mb-2 flex items-center gap-3">
                      <Layers size={14} /> Evaluation Breakdown
                   </h4>
                   
                   <div className="space-y-3">
                      {/* AI Score */}
                      <div className="flex justify-between items-center p-4 bg-white/5 dark:bg-black/20 rounded-2xl group/score">
                         <div className="flex items-center gap-3">
                            <Cpu size={16} className="text-indigo-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">AI Evaluation</span>
                         </div>
                         <div className="text-right">
                            <span className="text-sm font-black font-['Orbitron'] text-indigo-400">{r.aiScore}</span>
                         </div>
                      </div>

                      {/* Teacher Score */}
                      <div className="flex justify-between items-center p-4 bg-white/5 dark:bg-black/20 rounded-2xl">
                         <div className="flex items-center gap-3">
                            <User size={16} className="text-emerald-400" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Teacher Review</span>
                         </div>
                         <div className="text-right">
                            <span className="text-sm font-black font-['Orbitron'] text-emerald-400">{r.teacherScore}</span>
                         </div>
                      </div>

                      {/* Weightage Label */}
                      <p className="text-[8px] text-center text-gray-500 uppercase tracking-widest mt-2">
                         Hybrid Core applies 50/50 weighting protocols
                      </p>
                   </div>
                </div>
              </div>
              
              <button className="absolute bottom-6 right-10 text-blue-500/40 hover:text-blue-500 transition-colors">
                 <ChevronRight size={24} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}