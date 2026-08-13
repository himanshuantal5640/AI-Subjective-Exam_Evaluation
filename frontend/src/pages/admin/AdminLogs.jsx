import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import API from '../../services/api';

export default function AdminLogs() {
  const { darkMode } = useTheme();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await API.get("/admin/audit-logs");
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to fetch logs:", err);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[32px] gap-[15px]">
        <div>
          <h1 className={`text-[28px] md:text-[34px] font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} tracking-[1px] leading-tight`}>
            Audit Logs
          </h1>
          <p className={`${darkMode ? 'text-[rgba(220,200,255,0.58)]' : 'text-gray-500'} font-['JetBrains_Mono'] text-[13px] mt-[6px]`}>
            System events and security tracking
          </p>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-[#08060f]/80 border-indigo-500/10 shadow-2xl' : 'bg-white border-gray-200 shadow-xl'} backdrop-blur-md rounded-[18px] border p-6 font-['JetBrains_Mono'] text-sm overflow-x-auto`}>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`border-b ${darkMode ? 'border-white/5 text-indigo-400' : 'border-gray-100 text-indigo-600'}`}>
              <th className="py-2 pr-4">Timestamp</th>
              <th className="py-2 px-4">Level</th>
              <th className="py-2 px-4">Event</th>
              <th className="py-2 px-4">Actor</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id} className={`border-b ${darkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-50 hover:bg-gray-50/50'} transition-colors`}>
                <td className={`py-3 pr-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'} whitespace-nowrap`}>
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20`}>
                    INFO
                  </span>
                </td>
                <td className={`py-3 px-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Score Override: {log.previousTeacherScore} → {log.newTeacherScore}
                </td>
                <td className={`py-3 px-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {log.teacherId?.name || 'System'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
