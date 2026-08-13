import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { 
  LayoutDashboard, 
  BookOpen, 
  CheckCircle, 
  User, 
  LogOut, 
  X, 
  ChevronRight,
  Shield,
  Zap,
  Waves
} from "lucide-react";

export default function StudentSidebar({ sidebarOpen, setSidebarOpen }) {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/student/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Live Exams", path: "/student/exams", icon: <Zap size={20} /> },
    { name: "My Results", path: "/student/results", icon: <CheckCircle size={20} /> },
    { name: "Attendance", path: "/student/attendance", icon: <BookOpen size={20} /> },
    { name: "Profile", path: "/student/profile", icon: <User size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-500"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${
          darkMode 
            ? "bg-[#020817] border-white/5 shadow-[20px_0_50px_rgba(0,0,0,0.5)]" 
            : "bg-white border-blue-100 shadow-2xl shadow-blue-500/10"
        } border-r`}
      >
        <div className="h-full flex flex-col p-6">
          {/* Logo Section */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/student/dashboard')}>
              <div className="relative">
                <div className="absolute -inset-1 bg-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform duration-500">
                  <Waves className="text-white" size={24} />
                </div>
              </div>
              <div>
                <h1 className={`text-xl font-black font-['Orbitron'] tracking-tight leading-none ${darkMode ? 'text-white' : 'text-blue-900'}`}>
                  OCEAN<span className="text-blue-500">CORE</span>
                </h1>
                <p className="text-[8px] font-bold uppercase tracking-[3px] text-blue-400 mt-1 opacity-60 font-['JetBrains_Mono']">
                   L-NODE: Student
                </p>
              </div>
            </div>
            <button
              className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} className={darkMode ? "text-gray-400" : "text-gray-600"} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `
                  group relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 overflow-hidden font-['JetBrains_Mono']
                  ${isActive 
                    ? (darkMode ? "bg-blue-600/10 text-blue-400" : "bg-blue-50 text-blue-700") 
                    : (darkMode ? "text-gray-500 hover:text-blue-400" : "text-gray-500 hover:bg-blue-50 hover:text-blue-600")}
                `}
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-blue-500 rounded-r-full shadow-[4px_0_12px_rgba(59,130,246,0.5)]"></div>
                    )}
                    <span className={`transition-transform duration-500 ${isActive ? 'scale-110 rotate-3' : 'group-hover:scale-110 group-hover:-rotate-3'}`}>
                      {item.icon}
                    </span>
                    <span className={`text-[13px] font-bold tracking-tight transition-all duration-300 uppercase ${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                      {item.name}
                    </span>
                    <ChevronRight size={14} className={`ml-auto opacity-0 -translate-x-2 transition-all duration-300 ${isActive ? 'opacity-30' : 'group-hover:opacity-30 group-hover:translate-x-0'}`} />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* System Integrity Card */}
          <div className={`mt-auto mb-8 p-6 rounded-[32px] border relative overflow-hidden group ${
            darkMode ? 'bg-white/5 border-white/5' : 'bg-blue-50 border-blue-100'
          }`}>
             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                   <Shield size={14} className="text-blue-500" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-blue-500/60 font-['JetBrains_Mono']">Integrity Protocol</span>
                </div>
                <div className="space-y-2">
                   <div className="h-1 w-full bg-blue-500/10 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-blue-500 animate-[loading_3s_infinite]"></div>
                   </div>
                   <p className={`text-[9px] font-bold ${darkMode ? 'text-gray-500' : 'text-blue-900/40'} font-['JetBrains_Mono'] uppercase`}>Verified Environment</p>
                </div>
             </div>
          </div>

          {/* User Section (Small) */}
          <div className={`pt-6 border-t ${darkMode ? 'border-white/5' : 'border-blue-100'} flex items-center justify-between`}>
             <button
               onClick={() => {
                 localStorage.clear();
                 navigate('/login');
               }}
               className={`flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                 darkMode ? 'text-red-400 hover:bg-red-500/10' : 'text-red-600 hover:bg-red-50'
               } font-['Orbitron']`}
             >
               <LogOut size={16} />
               Sign Out
             </button>
          </div>
        </div>
      </aside>
    </>
  );
}
