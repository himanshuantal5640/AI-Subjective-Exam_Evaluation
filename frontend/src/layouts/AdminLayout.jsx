
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/layout/AdminSidebar';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Menu, Bell, Shield } from 'lucide-react';
import AdminChatButton from '../components/admin/AdminChatButton';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#030206] text-[#f0e6ff]' : 'bg-gray-50 text-gray-900'
      } font-['Rajdhani'] relative overflow-x-hidden`}>

      {/* Animated Backgrounds */}
      <div
        className={`fixed inset-0 z-0 pointer-events-none transition-opacity duration-500 ${darkMode ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.035) 1px,transparent 1px), linear-gradient(90deg,rgba(99,102,241,0.035) 1px,transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      ></div>
      <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-500 ${darkMode ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute w-[550px] h-[550px] rounded-full filter blur-[100px] bg-indigo-600 opacity-10 top-[-150px] right-[-120px]"></div>
        <div className="absolute w-[420px] h-[420px] rounded-full filter blur-[100px] bg-violet-600 opacity-[0.08] bottom-[-100px] left-[-80px]"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full filter blur-[100px] bg-purple-600 opacity-[0.07] top-[40%] left-[35%]"></div>
      </div>

      <AdminSidebar isSidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 flex flex-col relative z-10 overflow-y-auto w-full">
        {/* Universal Topbar */}
        <div className={`flex justify-between items-center p-4 md:p-6 border-b backdrop-blur-md sticky top-0 z-30 ${
          darkMode ? 'border-indigo-500/10 bg-[#08060f]/80' : 'border-gray-200 bg-white/80'
        }`}>
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
              <Menu className={darkMode ? 'text-white' : 'text-gray-900'} />
            </button>
            <div className="hidden md:flex items-center gap-2">
              <Shield className={darkMode ? 'text-indigo-500' : 'text-indigo-600'} size={20} />
              <div className={`font-['Orbitron'] font-bold text-sm tracking-[2px] uppercase ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Nexus Command
              </div>
            </div>
            <div className="md:hidden font-['Orbitron'] font-bold text-sm text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">
              Nexus Admin
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className={`hidden md:flex items-center px-4 py-2 rounded-xl text-[11px] font-bold tracking-[1px] uppercase border font-['JetBrains_Mono'] ${
               darkMode ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-500'
            }`}>
              Kernel: <span className="text-indigo-500 ml-1">v2.0.4-LTS</span>
            </div>
            
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all hover:scale-110 active:scale-90 border ${
                darkMode 
                  ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)]' 
                  : 'bg-white border-gray-200 text-gray-700 shadow-sm'
              }`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        <div className="p-[30px] md:p-[42px]">
          <Outlet />
        </div>
      </main>

      <AdminChatButton />
    </div>
  );
}
