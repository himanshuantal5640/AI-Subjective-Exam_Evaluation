import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import API from '../../services/api';

export default function AdminExams() {
  const { darkMode } = useTheme();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await API.get("/admin/exams"); 
        setExams(res.data);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
        // Fallback to dummy if API fails for now, or just show empty
      }
    };
    fetchExams();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[32px] gap-[15px]">
        <div>
          <h1 className={`text-[28px] md:text-[34px] font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} tracking-[1px] leading-tight`}>
            Comprehensive Exam Logs
          </h1>
          <p className={`${darkMode ? 'text-[rgba(220,200,255,0.58)]' : 'text-gray-500'} font-['JetBrains_Mono'] text-[13px] mt-[6px]`}>
            System-wide visibility of all examination instances
          </p>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-[#08060f]/80 border-indigo-500/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'bg-white border-gray-200 shadow-lg'} backdrop-blur-md rounded-[18px] border overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${darkMode ? 'bg-black/30 border-white/5' : 'bg-gray-50 border-gray-100'} border-b`}>
                <th className={`py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase font-['JetBrains_Mono']`}>Exam Title & Subject</th>
                <th className={`py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase font-['JetBrains_Mono'] text-center`}>Faculty</th>
                <th className={`py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase font-['JetBrains_Mono'] text-center`}>Submissions</th>
                <th className={`py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase font-['JetBrains_Mono'] text-right`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, idx) => (
                <tr key={exam._id} className={`border-b ${darkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-50 hover:bg-gray-50/50'} transition-colors group ${darkMode && idx % 2 === 0 ? 'bg-black/10' : ''}`}>
                  <td className="py-[18px] px-[24px]">
                    <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} text-[15px] group-hover:text-indigo-400 transition-colors`}>{exam.title}</div>
                    <div className={`text-[12px] ${darkMode ? 'text-gray-500' : 'text-gray-500'} font-['JetBrains_Mono']`}>{exam.subject}</div>
                  </td>
                  
                  <td className="py-[18px] px-[24px] text-center">
                    <div className={`inline-block px-[12px] py-[6px] rounded-[8px] ${darkMode ? 'bg-white/5 border-white/5 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-600'} border text-[13px]`}>
                      {exam.teacher?.name || 'Unknown'}
                    </div>
                  </td>
                  
                  <td className="py-[18px] px-[24px] text-center">
                    <span className={`font-['Orbitron'] font-bold text-[20px] ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:text-indigo-400 transition-colors`}>
                      {exam.submissions?.length || 0}
                    </span>
                  </td>
                  
                  <td className="py-[18px] px-[24px] text-right">
                     <span className={`px-[12px] py-[6px] rounded-full text-[10px] font-bold uppercase tracking-widest font-['JetBrains_Mono'] ${
                       exam.status === 'active' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.2)]' :
                       exam.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                       'bg-gray-500/10 text-gray-400 border border-gray-500/40'
                     }`}>
                       {exam.status}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
