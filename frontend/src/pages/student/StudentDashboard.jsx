import React, { useEffect, useState } from "react";
import StatCard from "../../components/student/StatCard";
import API from "../../services/api";
import { getMyAttendance } from "../../services/studentService";
import { useTheme } from "../../context/ThemeContext";
import { Trophy, BookOpen, Target, Activity, Zap, ShieldCheck } from "lucide-react";

export default function StudentDashboard() {
  const { darkMode } = useTheme();
  const [stats, setStats] = useState({
    score: 0,
    exams: 0,
    passRate: 0,
    attendanceRate: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data } = await API.get("/answers/my-results");

      const totalResults = data.length;
      let totalPercentage = 0;
      let passedExams = 0;

      data.forEach(r => {
        const score = r.aiFinalScore || r.teacherFinalScore || r.score || 0;
        const totalMarks = r.questionId?.totalMarks || r.examId?.totalMarks || 100;

        const percentage = (score / totalMarks) * 100;
        totalPercentage += percentage;

        if (percentage >= 40) passedExams++; 
      });

      let attendancePercentage = 0;
      try {
        const attRes = await getMyAttendance();
        const totalExams = attRes.data.length;
        if (totalExams > 0) {
          const presentCount = attRes.data.filter(a => a.status === "present").length;
          attendancePercentage = Math.round((presentCount / totalExams) * 100);
        }
      } catch (e) {
        console.error("Failed to load attendance", e);
      }

      setStats({
        score: totalResults > 0 ? Math.round(totalPercentage / totalResults) : 0,
        exams: totalResults,
        passRate: totalResults > 0 ? Math.round((passedExams / totalResults) * 100) : 0,
        attendanceRate: attendancePercentage
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      {/* Student Welcome Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#020817] to-[#0a2342] rounded-[40px] p-12 text-white shadow-2xl border border-blue-500/20 group">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-blue-500/20 transition-all duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-black font-['Orbitron'] tracking-tighter mb-4">
                OCEAN<span className="text-blue-500">TERMINAL</span>
              </h2>
              <p className="text-blue-100/60 font-['JetBrains_Mono'] text-sm max-w-xl leading-relaxed uppercase tracking-widest">
                Biological Unit Authenticated. Current Standing: <span className="text-blue-400 font-bold">Elite Tier</span>. System remains synchronized with examination nodes.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
                 <div className="px-5 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-[10px] font-black uppercase tracking-[4px] text-blue-400 flex items-center gap-3">
                    <ShieldCheck size={14} /> Integrity: 100%
                 </div>
                 <div className="px-5 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-[10px] font-black uppercase tracking-[4px] text-blue-400 flex items-center gap-3">
                    <Zap size={14} /> Latency: 4ms
                 </div>
              </div>
           </div>
           
           <div className="hidden lg:block relative animate-pulse-slow">
              <div className="w-40 h-40 rounded-full border-4 border-blue-500/30 border-dashed animate-[spin_20s_linear_infinite]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <Trophy size={60} className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
              </div>
           </div>
        </div>
      </div>

      {/* Stats Cluster */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Academic Potency", value: `${stats.score}%`, icon: <Activity size={24} />, delay: "delay-100", color: "text-blue-400" },
          { title: "Node Deployments", value: stats.exams, icon: <Target size={24} />, delay: "delay-200", color: "text-cyan-400" },
          { title: "Success Rate", value: `${stats.passRate}%`, icon: <Zap size={24} />, delay: "delay-300", color: "text-indigo-400" },
          { title: "Bio Attendance", value: `${stats.attendanceRate}%`, icon: <BookOpen size={24} />, delay: "delay-400", color: "text-sky-400" }
        ].map((stat, i) => (
          <StatCard 
            key={i} 
            title={stat.title} 
            value={stat.value} 
            icon={stat.icon} 
            color={stat.color} 
            delay={stat.delay} 
          />
        ))}
      </div>

      {/* Activity Monitor Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10 font-['JetBrains_Mono']">
         <div className={`lg:col-span-2 ${darkMode ? 'bg-[#0d1825]/80 border-blue-500/10' : 'bg-white border-blue-100'} backdrop-blur-xl border rounded-[40px] p-10 shadow-2xl`}>
            <h3 className="text-xl font-bold font-['Orbitron'] text-blue-500 mb-8 flex items-center gap-4">
               <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
               L-NODE Activity Stream
            </h3>
            <div className="space-y-6">
               {[1,2,3].map(i => (
                 <div key={i} className={`flex items-center justify-between p-6 rounded-3xl border ${darkMode ? 'border-white/5 bg-white/5' : 'bg-blue-50/50 border-blue-50'} group hover:border-blue-500/30 transition-all duration-300`}>
                    <div className="flex items-center gap-6">
                       <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] active:scale-150 transition-transform"></div>
                       <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-blue-900/60'}`}>
                          Node ID <span className="text-blue-500 font-bold">#S-0{i}</span> synchronization with AI evaluator...
                       </p>
                    </div>
                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{i * 12}m ago</span>
                 </div>
               ))}
            </div>
         </div>
         
         <div className={`bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/10 rounded-[40px] p-10 flex flex-col items-center justify-center text-center group`}>
            <div className={`w-24 h-24 ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'} rounded-3xl flex items-center justify-center mb-8 border border-blue-500/20 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
               <Zap size={40} className="text-blue-500 animate-pulse" />
            </div>
            <h4 className="text-xl font-bold font-['Orbitron'] text-white mb-4 uppercase tracking-tighter">Initialize Assessment</h4>
            <p className="text-[11px] text-blue-100/40 leading-relaxed mb-8 uppercase tracking-widest font-black">Secure protocol initialization for next evaluation node.</p>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-[24px] font-bold text-xs uppercase tracking-[3px] transition-all shadow-xl shadow-blue-600/20 active:scale-95 font-['Orbitron']">
               Connect Local
            </button>
         </div>
      </div>
    </div>
  );
}