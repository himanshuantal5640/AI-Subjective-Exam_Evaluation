import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import API from '../../services/api';

export default function AdminStudents() {
  const { darkMode } = useTheme();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await API.get("/admin/users");
        const allUsers = res.data;
        const studentUsers = allUsers.filter(u => u.role === 'student');
        setStudents(studentUsers);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[32px] gap-[15px]">
        <div>
          <h1 className={`text-[28px] md:text-[34px] font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} tracking-[1px] leading-tight flex items-center gap-[14px]`}>
            Student Records
            <span className={`text-[12px] font-['JetBrains_Mono'] px-[8px] py-[4px] rounded-[6px] ${darkMode ? 'bg-[#ffb830]/10 text-[#ffb830] border-[#ffb830]/20' : 'bg-orange-50 text-orange-600 border-orange-100'} border align-middle`}>
              {students.length} Total
            </span>
          </h1>
          <p className={`${darkMode ? 'text-[rgba(220,200,255,0.58)]' : 'text-gray-500'} font-['JetBrains_Mono'] text-[13px] mt-[6px]`}>
            Overview of all student accounts and academic metrics
          </p>
        </div>
        
        <div className="flex gap-[12px]">
          <div className="relative">
             <input type="text" placeholder="Search student..." className={`w-[240px] ${darkMode ? 'bg-[#08060f]/80 border-indigo-500/20 text-white placeholder-gray-600 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm'} backdrop-blur border rounded-[10px] py-[10px] pl-[38px] pr-[16px] text-[13px] font-['JetBrains_Mono'] focus:outline-none focus:border-indigo-500/60 transition-colors`} />
             <span className="absolute left-[14px] top-[10px] text-[14px] opacity-40">🔍</span>
          </div>
          <button className={`bg-indigo-500/10 border ${darkMode ? 'border-indigo-500/30 text-indigo-400' : 'border-indigo-200 text-indigo-600'} hover:bg-indigo-500 hover:text-white px-[18px] py-[10px] rounded-[10px] font-bold font-['JetBrains_Mono'] text-[12px] tracking-[1px] uppercase transition-all duration-300`}>
            Export
          </button>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-[#08060f]/80 border-indigo-500/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'bg-white border-gray-200 shadow-lg'} backdrop-blur-md rounded-[18px] border overflow-hidden relative`}>
        {darkMode && <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-gradient-to-bl from-indigo-500/5 to-transparent pointer-events-none rounded-bl-full"></div>}
        
        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${darkMode ? 'bg-black/30 border-white/5' : 'bg-gray-50 border-gray-100'} border-b`}>
                <th className={`py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase font-['JetBrains_Mono']`}>Student Details</th>
                <th className={`py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase font-['JetBrains_Mono'] text-center`}>Program</th>
                <th className={`py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase font-['JetBrains_Mono'] text-center`}>Exams</th>
                <th className={`py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase font-['JetBrains_Mono'] text-center`}>Avg Score</th>
                <th className={`py-[18px] px-[24px] text-[10px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase font-['JetBrains_Mono'] text-right`}>Settings</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr key={student._id} className={`border-b ${darkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-50 hover:bg-gray-50/50'} transition-colors group ${darkMode && idx % 2 === 0 ? 'bg-black/10' : ''}`}>
                  <td className="py-[18px] px-[24px]">
                    <div className="flex items-center gap-[14px]">
                      <div className="relative">
                        <div className={`w-[44px] h-[44px] rounded-[12px] ${darkMode ? 'bg-black/20 border-white/10' : 'bg-gray-50 border-gray-100'} border flex items-center justify-center overflow-hidden group-hover:border-indigo-500/50 transition-colors`}>
                          <span className="font-['Orbitron'] font-bold text-[18px] text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-violet-600">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        {student.isActive !== false && (
                          <div className="absolute -top-[3px] -right-[3px] w-[12px] h-[12px] bg-emerald-500 rounded-full border-[2px] border-[#08060f] shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                        )}
                      </div>
                      <div>
                        <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} text-[15px] group-hover:text-indigo-400 transition-colors`}>{student.name}</div>
                        <div className={`text-[12px] ${darkMode ? 'text-gray-500' : 'text-gray-500'} font-['JetBrains_Mono']`}>{student.email}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-[18px] px-[24px] text-center">
                    <div className={`inline-block px-[12px] py-[6px] rounded-[8px] ${darkMode ? 'bg-white/5 border-white/5 text-gray-300' : 'bg-gray-50 border-gray-100 text-gray-600'} border text-[13px]`}>
                      {student.course || 'Undeclared'}
                      <span className={`block text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} mt-[2px] uppercase font-['JetBrains_Mono'] tracking-[1px]`}>{student.year || 'N/A'}</span>
                    </div>
                  </td>
                  
                  <td className="py-[18px] px-[24px] text-center">
                    <span className={`font-['Orbitron'] font-bold text-[20px] ${darkMode ? 'text-white' : 'text-gray-900'}`}>{student.examsTaken || 0}</span>
                  </td>
                  
                  <td className="py-[18px] px-[24px] text-center">
                    <div className="flex flex-col items-center">
                      <span className={`font-['Orbitron'] font-bold text-[20px] ${
                        (student.avgScore || 0) >= 85 ? 'text-emerald-500' : (student.avgScore || 0) >= 70 ? 'text-indigo-400' : 'text-rose-500'
                      }`}>
                        {student.avgScore || 0}%
                      </span>
                      <div className={`w-[40px] h-[3px] ${darkMode ? 'bg-black/50' : 'bg-gray-100'} rounded-full mt-[6px] overflow-hidden`}>
                        <div className={`h-full rounded-full ${
                          (student.avgScore || 0) >= 85 ? 'bg-emerald-500' : (student.avgScore || 0) >= 70 ? 'bg-indigo-400' : 'bg-rose-500'
                        }`} style={{ width: `${student.avgScore || 0}%` }}></div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-[18px] px-[24px] text-right">
                     <button className={`${darkMode ? 'text-gray-600 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'} p-[8px] rounded-[8px] transition-colors`}>
                        ⚙️
                     </button>
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
