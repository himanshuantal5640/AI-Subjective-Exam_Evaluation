import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import API from '../../services/api';
import { LogOut, Shield } from 'lucide-react';

export default function AdminSidebar({ isSidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const { darkMode } = useTheme();
  const [counts, setCounts] = React.useState({
    teachers: 0,
    students: 0,
    exams: 0,
  });

  React.useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { data } = await API.get("/admin/system-analytics");
        const userRes = await API.get("/admin/users");
        const allUsers = userRes.data;

        setCounts({
          teachers: allUsers.filter(u => u.role === 'teacher').length,
          students: allUsers.filter(u => u.role === 'student').length,
          exams: data.totalExams || 0,
        });
      } catch (err) {
        console.error("Failed to fetch sidebar counts:", err);
      }
    };
    fetchCounts();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "⊞" },
    { name: "All Teachers", path: "/admin/teachers", icon: "🎓", badge: { text: counts.teachers.toString(), type: "primary" } },
    { name: "All Students", path: "/admin/students", icon: "👥", badge: { text: counts.students.toString(), type: "indigo" } },
    { name: "Manage Assignments", path: "/admin/assignments", icon: "🔗" },
    { name: "Add User", path: "/admin/add-user", icon: "➕" },
    { name: "All Exams", path: "/admin/exams", icon: "📋", badge: { text: counts.exams.toString(), type: "sky" } },
    { name: "Audit Logs", path: "/admin/logs", icon: "📜", badge: { text: "Live", type: "rose" } },
    { name: "System Settings", path: "/admin/settings", icon: "⚙️" },
    { name: "My Profile", path: "/admin/profile", icon: "👤" },
  ];

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] ${
        darkMode ? 'bg-[#08060f]/95 border-indigo-500/10' : 'bg-white border-gray-200 shadow-xl'
      } border-r backdrop-blur-md flex flex-col py-6 transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

        <div className={`px-6 pb-6 border-b ${darkMode ? 'border-white/5' : 'border-gray-100'} mb-6`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Shield size={20} className="text-white" />
            </div>
            <div>
              <div className={`font-['Orbitron'] text-sm font-bold tracking-wider ${darkMode ? 'text-white' : 'text-gray-900 uppercase'}`}>
                NexusEval
              </div>
              <div className={`text-[9px] font-bold tracking-widest uppercase ${darkMode ? 'text-indigo-400/50' : 'text-indigo-600/60'}`}>
                Administrator
              </div>
            </div>
          </div>
          <div className={`inline-block text-[9px] font-bold tracking-[2px] uppercase py-1.5 px-3 rounded-full ${
            darkMode ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-100'
          } border font-['JetBrains_Mono']`}>
            Secure Session
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-8 overflow-y-auto custom-scrollbar">
          <div>
            <p className={`text-[10px] font-bold tracking-[2px] uppercase mb-4 px-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              Main Menu
            </p>
            <ul className="space-y-1">
              {navItems.slice(0, 1).map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-semibold text-[13px] ${
                        isActive
                          ? darkMode ? 'bg-indigo-500/10 text-white border border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                          : darkMode ? 'text-gray-500 hover:text-gray-300 hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    <span>{item.icon}</span>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={`text-[10px] font-bold tracking-[2px] uppercase mb-4 px-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              Management
            </p>
            <ul className="space-y-1">
              {navItems.slice(1, 4).map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-semibold text-[13px] group ${
                        isActive
                          ? darkMode ? 'bg-indigo-500/10 text-white border border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                          : darkMode ? 'text-gray-500 hover:text-gray-300 hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span>{item.icon}</span>
                      {item.name}
                    </div>
                    {item.badge && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                        darkMode ? 'bg-white/5 text-indigo-400' : 'bg-white text-indigo-600 shadow-sm'
                      }`}>
                        {item.badge.text}
                      </span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={`text-[10px] font-bold tracking-[2px] uppercase mb-4 px-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
              System
            </p>
            <ul className="space-y-1">
              {navItems.slice(4).map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-semibold text-[13px] ${
                        isActive
                          ? darkMode ? 'bg-indigo-500/10 text-white border border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                          : darkMode ? 'text-gray-500 hover:text-gray-300 hover:bg-white/5' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span>{item.icon}</span>
                      {item.name}
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className={`mt-auto px-4 pt-6 border-t ${darkMode ? 'border-white/5' : 'border-gray-100'}`}>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
              darkMode ? 'hover:bg-rose-500/10 text-gray-500 hover:text-rose-500' : 'hover:bg-rose-50 text-gray-500 hover:text-rose-600'
            }`}
          >
            <LogOut size={18} />
            <span className="font-bold text-xs uppercase tracking-widest">Terminate Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}
