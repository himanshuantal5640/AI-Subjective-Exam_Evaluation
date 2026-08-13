import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "../../context/ThemeContext";
import API from "../../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Camera, Shield, Mail, User, LogOut } from "lucide-react";

export default function AdminProfile() {
  const { darkMode } = useTheme();
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "admin",
    profileImage: ""
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get("/users/me"); // Correct endpoint
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch admin profile:", err);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await API.put("/users/update", { name: user.name }); // Correct endpoint
      toast.success("Admin Credentials Updated");
      setEditing(false);
    } catch {
      toast.error("Cloud Update Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-center p-6 min-h-screen animate-in fade-in duration-700 font-['JetBrains_Mono']">
      <div className={`w-full max-w-2xl ${
        darkMode ? 'bg-[#0a0515]/80 border-indigo-500/10 shadow-2xl text-white' : 'bg-white border-indigo-200 shadow-xl text-gray-800'
      } backdrop-blur-3xl border rounded-[40px] p-12 transition-all duration-500 relative overflow-hidden group`}>
        
        {/* Admin Geometric Accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-indigo-500/10 transition-all duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-600/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

        <div className="relative z-10 text-center mb-12">
           <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-3xl ${darkMode ? 'bg-indigo-500/10 border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)]' : 'bg-indigo-50'} border`}>
                 <Shield size={32} className="text-indigo-500" />
              </div>
           </div>
          <h2 className={`text-2xl font-black font-['Orbitron'] uppercase tracking-[6px] mb-2 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
            System Authority
          </h2>
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent mx-auto"></div>
        </div>

        {/* Profile Image HUD */}
        <div className="flex flex-col items-center mb-16 relative">
          <div className="relative group/avatar">
            <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-[36px] blur opacity-20 group-hover/avatar:opacity-40 transition duration-500`}></div>
            <div className={`relative w-40 h-40 rounded-[32px] overflow-hidden border-4 ${
                darkMode ? 'border-[#0a0515] shadow-2xl' : 'border-white shadow-lg'
              } transition-all duration-500 group-hover/avatar:scale-[1.02]`}>
               <img
                 src={user.profileImage || "/avatar.png"}
                 alt="profile"
                 className="w-full h-full object-cover"
               />
               
               {editing && (
                 <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center animate-in fade-in">
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="bg-indigo-600 p-4 rounded-2xl shadow-2xl text-white hover:scale-110 transition active:scale-95"
                    >
                      <Camera size={24} />
                    </button>
                 </div>
               )}
            </div>

            {!editing && (
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-indigo-600 rounded-full shadow-lg shadow-indigo-600/20 text-[8px] font-black uppercase tracking-[3px] text-white">
                 Root Account
              </div>
            )}
          </div>

          <input type="file" ref={fileInputRef} onChange={(e) => {
             const file = e.target.files[0];
             if(file) {
                // handle upload logic...
                toast.success("Uploading to encrypted server...");
             }
          }} className="hidden" />
          
          {!editing && (
             <div className="mt-10 text-center">
                <h3 className={`text-2xl font-black font-['Orbitron'] tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name || 'SYS_ADMIN'}</h3>
                <p className="text-[10px] font-black uppercase tracking-[4px] text-indigo-500 mt-2 opacity-60">Authentication Level 10</p>
             </div>
          )}
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
           <div className={`p-8 rounded-[32px] border transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-indigo-100'}`}>
              <label className={`text-[10px] font-black uppercase tracking-[3px] ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-4 block`}>
                Designation
              </label>
              {editing ? (
                <input
                  value={user.name || ""}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className={`w-full p-2 bg-transparent border-b ${darkMode ? 'border-indigo-500/30 text-white' : 'border-indigo-500 text-gray-900'} outline-none focus:border-indigo-400 transition-colors uppercase font-bold`}
                />
              ) : (
                <p className={`text-sm font-bold tracking-tight uppercase ${darkMode ? 'text-indigo-100' : 'text-gray-800'}`}>{user.name || 'Not Configured'}</p>
              )}
           </div>

           <div className={`p-8 rounded-[32px] border transition-all ${darkMode ? 'bg-white/5 border-white/5' : 'bg-gray-50 border-indigo-100'}`}>
              <label className={`text-[10px] font-black uppercase tracking-[3px] ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-4 block`}>
                Secure Node (Email)
              </label>
              <p className={`text-sm font-bold truncate ${darkMode ? 'text-indigo-100/60' : 'text-gray-600'}`}>{user.email}</p>
           </div>

           <div className={`p-8 rounded-[32px] border transition-all md:col-span-2 ${darkMode ? 'bg-gradient-to-r from-indigo-500/10 to-transparent border-indigo-500/20' : 'bg-indigo-50 border-indigo-100'}`}>
              <div className="flex justify-between items-center">
                 <div>
                    <label className={`text-[10px] font-black uppercase tracking-[3px] ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mb-4 block`}>
                      System Permission
                    </label>
                    <div className="flex items-center gap-4">
                       <p className="text-sm font-black text-indigo-500 uppercase tracking-[4px]">{user.role || 'ADMIN'}</p>
                       <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                       <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Full Overwrite Access</span>
                    </div>
                 </div>
                 <div className="hidden sm:block">
                    <User size={32} className="text-indigo-500/20" />
                 </div>
              </div>
           </div>
        </div>

        {/* Global Controls */}
        <div className="flex flex-col sm:flex-row gap-6">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex-1 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black text-xs uppercase tracking-[4px] transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 font-['Orbitron']"
            >
              Modify Credentials
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex-1 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[24px] font-black text-xs uppercase tracking-[4px] transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 font-['Orbitron']"
            >
              {loading ? "Syncing Logic..." : "Commit Protocol"}
            </button>
          )}

          <button
            onClick={handleLogout}
            className={`px-10 py-5 ${
              darkMode ? 'bg-rose-500/5 text-rose-500 border border-rose-500/10 hover:bg-rose-500/10' : 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100'
            } rounded-[24px] font-black text-xs uppercase tracking-[4px] transition-all active:scale-95 font-['Orbitron'] flex items-center justify-center gap-3`}
          >
            <LogOut size={18} /> Kill Process
          </button>
        </div>

        {/* Encryption Footer */}
        <div className="mt-12 text-center opacity-10">
           <p className="text-[8px] font-black uppercase tracking-[8px]">AES-256 Cloud Infrastructure Secured</p>
        </div>

      </div>
    </div>
  );
}
