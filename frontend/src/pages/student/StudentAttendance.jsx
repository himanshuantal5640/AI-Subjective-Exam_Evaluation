import React, { useEffect, useState } from "react";
import { getMyAttendance } from "../../services/studentService";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";
import { Calendar, CheckCircle, XCircle, Activity, ShieldCheck, Zap } from "lucide-react";

export default function StudentAttendance() {
  const { darkMode } = useTheme();
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const { data } = await getMyAttendance();
      setAttendance(data);
    } catch {
      toast.error("Failed to load attendance archives");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const presentCount = attendance.filter(a => a.status === "present").length;
  const percentage = attendance.length > 0 
    ? Math.round((presentCount / attendance.length) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 space-y-6 font-['JetBrains_Mono']">
         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
         <p className="text-[10px] uppercase tracking-[4px] font-black text-blue-500/40 animate-pulse">Syncing Presence Logs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 font-['JetBrains_Mono']">
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className={`text-3xl font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} tracking-tight`}>
            Bio-Metric Presence
          </h1>
          <p className={`text-sm ${darkMode ? 'text-blue-500/40' : 'text-gray-500'} mt-2 uppercase tracking-widest`}>
            Temporal Participation Logs
          </p>
        </div>
        <div className={`px-5 py-4 rounded-[24px] ${darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'} border flex items-center gap-8 shadow-xl shadow-blue-500/5`}>
           <div className="text-right">
              <p className="text-[8px] font-black uppercase tracking-widest text-blue-500/60 mb-1">Consistency Rating</p>
              <div className="text-3xl font-black font-['Orbitron'] text-blue-500">{percentage}%</div>
           </div>
           <div className="h-10 w-px bg-blue-500/10 hidden md:block"></div>
           <div className="hidden md:block">
              <p className="text-[8px] font-black uppercase tracking-widest text-blue-500/60 mb-1">Status</p>
              <div className="flex items-center gap-2">
                 <ShieldCheck size={14} className="text-blue-500" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Verified</span>
              </div>
           </div>
        </div>
      </div>

      {/* Stats Summary Mobile */}
      <div className="grid grid-cols-2 gap-4 md:hidden">
         <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-blue-100'}`}>
            <p className="text-[8px] font-black text-blue-500 uppercase mb-2">Present</p>
            <p className="text-xl font-bold font-['Orbitron']">{presentCount}</p>
         </div>
         <div className={`p-6 rounded-3xl border ${darkMode ? 'bg-white/5 border-white/5' : 'bg-white border-blue-100'}`}>
            <p className="text-[8px] font-black text-red-500 uppercase mb-2">Absent</p>
            <p className="text-xl font-bold font-['Orbitron']">{attendance.length - presentCount}</p>
         </div>
      </div>

      {/* Main Logs Table */}
      <div className={`relative overflow-hidden ${darkMode ? 'bg-[#0d1825]/80 border-blue-500/10' : 'bg-white border-blue-100'} backdrop-blur-xl border rounded-[40px] p-8 shadow-2xl`}>
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
         
         <h3 className="text-lg font-bold font-['Orbitron'] text-blue-500 mb-8 flex items-center gap-4 relative z-10">
            <Calendar size={18} />
            Historical Node Syncs
         </h3>

         <div className="space-y-4 relative z-10">
            {attendance.length === 0 ? (
               <div className="py-20 text-center opacity-20 flex flex-col items-center gap-4">
                  <Activity size={48} />
                  <p className="text-[10px] font-black uppercase tracking-[4px]">No Bio-Data Captured</p>
               </div>
            ) : (
               attendance.map((record, index) => (
                  <div
                    key={index}
                    className={`group flex flex-col sm:flex-row justify-between items-center p-6 rounded-[24px] border transition-all duration-300 ${
                        darkMode ? 'bg-black/20 border-white/5 hover:border-blue-500/30' : 'bg-gray-50/50 border-gray-100 hover:border-blue-500/20'
                    }`}
                  >
                    <div className="flex items-center gap-6 mb-4 sm:mb-0">
                       <div className={`p-3 rounded-2xl ${
                          record.status === "present" 
                             ? (darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600')
                             : (darkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-600')
                       } border border-current/10`}>
                          {record.status === "present" ? <CheckCircle size={20} /> : <XCircle size={20} />}
                       </div>
                       <div>
                          <div className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-blue-900'} font-['Orbitron'] truncate max-w-xs`}>
                             {record.exam.title}
                          </div>
                          <div className="flex items-center gap-3 mt-1">
                             <div className="text-[9px] font-black text-blue-500/40 uppercase tracking-widest">{record.exam.subject}</div>
                             <div className="w-1 h-1 rounded-full bg-blue-500/20"></div>
                             <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Protocol: #{record.exam._id.slice(-6)}</div>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                       <div className="text-right flex flex-col items-end">
                          <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black tracking-[2px] uppercase border ${
                            record.status === "present"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}>
                            {record.status}
                          </span>
                       </div>
                       <div className="p-3 rounded-xl bg-blue-500/5 text-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Zap size={14} />
                       </div>
                    </div>
                  </div>
               ))
            )}
         </div>

         {/* Footer Tech Info */}
         <div className="mt-10 pt-8 border-t border-blue-500/5 flex justify-center">
            <p className="text-[8px] font-black uppercase tracking-[5px] text-blue-500/20 text-center animate-pulse">
               End of Presence Ledger • Secure Archive
            </p>
         </div>
      </div>
    </div>
  );
}
