import React from "react";
import { useTheme } from "../../context/ThemeContext";

export default function StatCard({ title, value, icon, color, delay }) {
  const { darkMode } = useTheme();
  
  return (
    <div className={`group relative bg-white dark:bg-[#0d1825]/80 backdrop-blur-xl border border-blue-500/10 rounded-[32px] p-8 hover:border-blue-500/30 transition-all duration-500 shadow-xl shadow-blue-500/5 animate-in zoom-in-95 ${delay}`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-blue-500/10 transition-all duration-700"></div>
      
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className={`p-4 rounded-2xl ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'} ${color}`}>
          {icon}
        </div>
        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
      </div>
      
      <div className="relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[3px] text-gray-400 dark:text-blue-500/40 mb-2 font-['JetBrains_Mono']">
          {title}
        </p>
        <h2 className={`text-4xl font-bold font-['Orbitron'] tracking-tighter ${darkMode ? 'text-white' : 'text-blue-900'} group-hover:text-blue-500 transition-colors`}>
          {value}
        </h2>
        
        <div className="mt-6 w-full h-1 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
           <div className={`h-full bg-blue-500 rounded-full opacity-40 animate-[loading_2s_ease-in-out_infinite]`} style={{ width: '70%' }}></div>
        </div>
      </div>
    </div>
  );
}