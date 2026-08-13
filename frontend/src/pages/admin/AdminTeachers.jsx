import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import API from '../../services/api';

export default function AdminTeachers() {
  const { darkMode } = useTheme();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await API.get("/admin/users");
        const allUsers = res.data;
        const teacherUsers = allUsers.filter(u => u.role === 'teacher');
        setTeachers(teacherUsers);
      } catch (err) {
        console.error("Failed to fetch teachers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[32px] gap-[15px]">
        <div>
          <h1 className={`text-[28px] md:text-[34px] font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} tracking-[1px] leading-tight`}>
            Teacher Management
          </h1>
          <p className={`${darkMode ? 'text-[rgba(220,200,255,0.58)]' : 'text-gray-500'} font-['JetBrains_Mono'] text-[13px] mt-[6px]`}>
            Manage faculty accounts and access privileges
          </p>
        </div>
        <button className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] text-white px-[24px] py-[12px] rounded-[12px] font-bold font-['JetBrains_Mono'] text-[13px] tracking-[1px] uppercase transition-all duration-300">
          + Add Teacher
        </button>
      </div>

      <div className={`${darkMode ? 'bg-[#08060f]/80 border-indigo-500/10' : 'bg-white border-gray-200 shadow-sm'} backdrop-blur-md rounded-[18px] border overflow-hidden`}>
        <div className={`flex border-b ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <button className={`flex-1 py-[16px] text-center font-['JetBrains_Mono'] text-[13px] font-bold tracking-[1px] uppercase ${darkMode ? 'text-white bg-white/5 border-indigo-500' : 'text-indigo-600 bg-indigo-50/50 border-indigo-500'} border-b-[2px]`}>
            All Teachers ({teachers.length})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={darkMode ? 'bg-black/20' : 'bg-gray-50'}>
                <th className={`py-[16px] px-[24px] text-[11px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase font-['JetBrains_Mono']`}>Teacher</th>
                <th className={`py-[16px] px-[24px] text-[11px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase font-['JetBrains_Mono']`}>Department</th>
                <th className={`py-[16px] px-[24px] text-[11px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase font-['JetBrains_Mono']`}>Activity</th>
                <th className={`py-[16px] px-[24px] text-[11px] font-bold tracking-[2px] ${darkMode ? 'text-indigo-300/40' : 'text-gray-400'} uppercase font-['JetBrains_Mono'] text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher._id} className={`border-b ${darkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-50 hover:bg-gray-50/50'} transition-colors group`}>
                  <td className="py-[16px] px-[24px]">
                    <div className="flex items-center gap-[12px]">
                      <div className={`w-[40px] h-[40px] rounded-full bg-gradient-to-br ${darkMode ? 'from-indigo-500/20 to-violet-500/20 border-indigo-500/30 text-white' : 'from-indigo-100 to-violet-100 border-indigo-200 text-indigo-700'} flex items-center justify-center border font-bold font-['Orbitron']`}>
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} text-[15px]`}>{teacher.name}</div>
                        <div className={`text-[12px] ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{teacher.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className={`py-[16px] px-[24px] text-[14px] ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {teacher.department || 'General'}
                  </td>
                  <td className="py-[16px] px-[24px]">
                    <div className={`text-[14px] ${darkMode ? 'text-white' : 'text-gray-900'} font-bold flex items-center gap-[6px]`}>
                      {teacher.generatedExams || 0} <span className="text-[11px] text-indigo-500 font-['JetBrains_Mono'] font-normal">Exams</span>
                    </div>
                    <div className={`text-[11px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} mt-[2px]`}>{teacher.lastActive || 'N/A'}</div>
                  </td>
                  <td className="py-[16px] px-[24px] text-right">
                    <button className={`px-[14px] py-[6px] rounded-[6px] ${darkMode ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20 hover:bg-indigo-500 hover:text-white' : 'bg-indigo-50 text-indigo-600 border-indigo-200 hover:bg-indigo-600 hover:text-white'} border text-[11px] font-bold font-['JetBrains_Mono'] uppercase transition-colors mr-[8px]`}>
                      Edit
                    </button>
                    {teacher.status === 'active' ? (
                      <button className={`px-[14px] py-[6px] rounded-[6px] ${darkMode ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500 hover:text-white' : 'bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-600 hover:text-white'} border text-[11px] font-bold font-['JetBrains_Mono'] uppercase transition-colors`}>
                        Suspend
                      </button>
                    ) : (
                      <button className={`px-[14px] py-[6px] rounded-[6px] ${darkMode ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500 hover:text-white' : 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-600 hover:text-white'} border text-[11px] font-bold font-['JetBrains_Mono'] uppercase transition-colors`}>
                        Activate
                      </button>
                    )}
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
