import React, { useEffect, useState, useRef } from "react";
import { getTeacherProfile, updateTeacherProfile } from "../../services/teacherService";
import { logoutUser } from "../../services/authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function TeacherProfile() {
  const { darkMode } = useTheme();
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await getTeacherProfile();
      setUser(data);
    } catch {
      toast.error("Failed to load profile");
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateTeacherProfile({
        name: user.name,
      });

      toast.success("Profile Updated Successfully");
      setEditing(false);
    } catch {
      toast.error("Update Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await updateTeacherProfile(formData);
      toast.success("Profile Photo Updated");
      fetchProfile();
    } catch {
      toast.error("Image Upload Failed");
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-center p-6 min-h-screen animate-in fade-in duration-700">
      <div className={`w-full max-w-2xl ${
        darkMode ? 'bg-[#08150f]/80 border-emerald-500/10 shadow-2xl text-white' : 'bg-white border-gray-200 shadow-xl text-gray-800'
      } backdrop-blur-xl border rounded-[40px] p-10 transition-all duration-500 relative overflow-hidden group`}>
        
        {/* Animated Background Element */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all duration-700"></div>

        <div className="relative z-10 text-center mb-10">
          <h2 className={`text-2xl font-black font-['Orbitron'] uppercase tracking-[4px] mb-2 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
            Faculty Profile
          </h2>
          <div className="h-1 w-20 bg-emerald-500/20 mx-auto rounded-full"></div>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-12 relative">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500 to-blue-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <img
              src={user.profileImage || "/avatar.png"}
              alt="profile"
              className={`relative w-32 h-32 rounded-full object-cover border-4 ${
                darkMode ? 'border-[#0a2316] shadow-2xl' : 'border-white shadow-lg'
              } transition-all duration-500 group-hover:scale-105`}
            />

            {editing && (
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-1 right-1 bg-emerald-500 p-3 rounded-2xl shadow-xl text-white hover:scale-110 transition-all border border-emerald-400/20 active:scale-95"
              >
                <Camera size={18} />
              </button>
            )}
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
          
          {!editing && (
             <div className="mt-6 font-['Orbitron']">
                <h3 className={`text-xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>{user.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-[3px] text-emerald-500 mt-1 opacity-60">Authorized Faculty</p>
             </div>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left font-['JetBrains_Mono']">
           <div className={`p-6 rounded-[24px] border transition-all ${darkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
              <label className={`text-[10px] font-bold uppercase tracking-[2px] ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-3 block`}>
                User Identity
              </label>
              {editing ? (
                <input
                  value={user.name || ""}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className={`w-full p-2 bg-transparent border-b ${darkMode ? 'border-emerald-500/30 text-white' : 'border-emerald-500 text-gray-900'} outline-none`}
                />
              ) : (
                <p className={`text-sm font-bold ${darkMode ? 'text-emerald-100' : 'text-gray-800'}`}>{user.name}</p>
              )}
           </div>

           <div className={`p-6 rounded-[24px] border transition-all ${darkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-100'}`}>
              <label className={`text-[10px] font-bold uppercase tracking-[2px] ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-3 block`}>
                Secure Mail
              </label>
              <p className={`text-sm font-bold ${darkMode ? 'text-emerald-100/60' : 'text-gray-600'}`}>{user.email}</p>
           </div>

           <div className={`p-6 rounded-[24px] border transition-all ${darkMode ? 'bg-black/20 border-white/5' : 'bg-gray-50 border-gray-100'} md:col-span-2`}>
              <div className="flex justify-between items-center">
                 <div>
                    <label className={`text-[10px] font-bold uppercase tracking-[2px] ${darkMode ? 'text-gray-600' : 'text-gray-400'} mb-3 block`}>
                      Access Level
                    </label>
                    <p className="text-xs font-black text-emerald-500 uppercase tracking-widest">{user.role || 'TEACHER'}_CORE</p>
                 </div>
                 <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[8px] font-black uppercase text-emerald-400">
                    Encrypted Node
                 </div>
              </div>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[20px] font-bold text-xs uppercase tracking-[2px] transition-all shadow-xl shadow-emerald-600/10 active:scale-95 font-['Orbitron']"
            >
              Modify Signature
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[20px] font-bold text-xs uppercase tracking-[2px] transition-all shadow-xl shadow-emerald-600/10 active:scale-95 font-['Orbitron']"
            >
              {loading ? "Syncing..." : "Commit Changes"}
            </button>
          )}

          <button
            onClick={handleLogout}
            className={`px-8 py-4 ${
              darkMode ? 'bg-red-500/5 text-red-500 border border-red-500/10 hover:bg-red-500/10' : 'bg-red-50 text-red-600 border border-red-100 hover:bg-red-100'
            } rounded-[20px] font-bold text-xs uppercase tracking-[2px] transition-all active:scale-95 font-['Orbitron']`}
          >
            Terminate Session
          </button>
        </div>

      </div>
    </div>
  );
}