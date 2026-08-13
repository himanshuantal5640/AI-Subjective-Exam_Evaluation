import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, PlusCircle, Files, Users, User, LogOut, GraduationCap } from "lucide-react";

export default function TeacherSidebar({ open, setOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { name: "Dashboard", path: "/teacher/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Create Exam", path: "/teacher/create", icon: <PlusCircle size={20} /> },
    { name: "Manage Exams", path: "/teacher/manage", icon: <Files size={20} /> },
    { name: "My Students", path: "/teacher/students", icon: <Users size={20} /> },
    { name: "Profile", path: "/teacher/profile", icon: <User size={20} /> },
  ];

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
      isActive
        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
        : "text-gray-600 dark:text-emerald-100/60 hover:bg-emerald-500/10 hover:text-emerald-600"
    }`;

  return (
    <>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
        />
      )}

      <aside
        className={`
        fixed md:static z-50
        h-screen w-64
        bg-white dark:bg-[#051109]
        border-r border-gray-200 dark:border-emerald-500/10
        flex flex-col
        transform transition-all duration-500 ease-out
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >
        <div className="p-8 border-b dark:border-white/5 mb-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-600/30">
                <GraduationCap className="text-white" size={24} />
             </div>
             <div>
                <h1 className="text-xl font-bold font-['Orbitron'] text-emerald-600 dark:text-emerald-400">
                  NexusEval
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Faculty Portal</p>
             </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={linkStyle}>
              {item.icon}
              <span className="text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t dark:border-white/5">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-all duration-300 group"
           >
              <LogOut size={20} />
              <span className="text-xs font-bold uppercase tracking-wider">Sign Out</span>
           </button>
        </div>
      </aside>
    </>
  );
}