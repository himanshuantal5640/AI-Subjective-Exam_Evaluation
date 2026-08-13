import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import { LayoutDashboard, PlusCircle, Files, Users, Activity, Zap, ShieldCheck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalExams: 0,
    activeExams: 0,
    completedExams: 0,
    totalStudents: 0,
  });

  const loadData = async () => {
    try {
      const examRes = await api.get("/exams/my-exams");
      const exams = examRes.data;

      let studentCount = 0;
      try {
        const studentRes = await api.get("/users/students");
        studentCount = studentRes.data.length;
      } catch (e) {
        console.warn("Could not fetch students", e.message);
      }

      setStats({
        totalExams: exams.length,
        activeExams: exams.filter(e => e.status === "active").length,
        completedExams: exams.filter(e => e.status === "completed").length,
        totalStudents: studentCount,
      });

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden bg-[#0a2316] rounded-3xl p-10 text-white shadow-2xl border border-emerald-500/20 group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold font-['Orbitron'] tracking-tight mb-3">
            Command Center <span className="text-emerald-400">Online</span>
          </h2>
          <p className="text-emerald-100/60 font-['JetBrains_Mono'] text-sm max-w-xl leading-relaxed">
            Infrastructure operational. Welcome back, Educator. You have <span className="text-emerald-400 font-bold">{stats.activeExams} active assessment nodes</span> currently broadcasting.
          </p>
          <div className="mt-8 flex gap-4">
             <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                <Zap size={12} /> Latent AI Core: Active
             </div>
             <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                <ShieldCheck size={12} /> Uptime: 99.9%
             </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Deployments", value: stats.totalExams, icon: <Files size={24} />, delay: "delay-100", color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { title: "Active Nodes", value: stats.activeExams, icon: <Activity size={24} />, delay: "delay-200", color: "text-blue-400", bg: "bg-blue-500/10" },
          { title: "Review Pending", value: stats.completedExams, icon: <Clock size={24} />, delay: "delay-300", color: "text-amber-400", bg: "bg-amber-500/10" },
          { title: "Enrolled Units", value: stats.totalStudents, icon: <Users size={24} />, delay: "delay-400", color: "text-violet-400", bg: "bg-violet-500/10" }
        ].map((stat, i) => (
          <div key={i} className={`group bg-white dark:bg-[#08150f]/80 backdrop-blur-xl border border-gray-200 dark:border-emerald-500/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-500 animate-in zoom-in-95 ${stat.delay}`}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[2px] text-gray-400 dark:text-emerald-500/40 mb-2 font-['JetBrains_Mono']">
              {stat.title}
            </p>
            <h2 className={`text-3xl font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {stat.value}
            </h2>
            <div className="mt-4 w-full h-1 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
               <div className={`h-full bg-current rounded-full ${stat.color} opacity-40`} style={{ width: '60%' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
         <div className="lg:col-span-2 bg-white dark:bg-[#08150f]/80 border border-gray-200 dark:border-emerald-500/10 rounded-3xl p-8 backdrop-blur-md">
            <h3 className="text-xl font-bold font-['Orbitron'] text-gray-800 dark:text-emerald-400 mb-6 flex items-center gap-3">
               <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
               Recent System Logs
            </h3>
            <div className="space-y-4">
               {[1,2,3].map(i => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                    <div className="flex items-center gap-4">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                       <p className="text-xs font-['JetBrains_Mono'] text-gray-500 dark:text-emerald-100/40">
                          Assessment node <span className="text-emerald-400">#E-0{i}</span> synchronizing with AI core...
                       </p>
                    </div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">{i * 3}m ago</span>
                 </div>
               ))}
            </div>
         </div>
         
         <div className="bg-gradient-to-br from-emerald-600/10 to-transparent border border-emerald-500/10 rounded-3xl p-8 backdrop-blur-md flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 animate-bounce">
               <PlusCircle size={40} className="text-emerald-400" />
            </div>
            <h4 className="text-lg font-bold font-['Orbitron'] text-white mb-2 uppercase tracking-tight">Deploy New Exam</h4>
            <p className="text-xs text-emerald-100/40 leading-relaxed mb-6 font-['JetBrains_Mono']">Initialize a new assessment node with hybrid AI scoring protocols.</p>
            <button 
              onClick={() => navigate('/teacher/create')}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-[2px] transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
            >
               Start Initialization
            </button>
         </div>
      </div>
    </div>
  );
}