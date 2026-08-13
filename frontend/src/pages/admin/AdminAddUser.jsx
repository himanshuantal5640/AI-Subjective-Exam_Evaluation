import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function AdminAddUser() {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'student',
    password: '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate backend call
    alert('User creation requested:\n' + JSON.stringify(formData, null, 2));
    setFormData({ name: '', email: '', role: 'student', password: '' });
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="mb-8">
        <h1 className={`text-[28px] md:text-[34px] font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} tracking-[1px] leading-tight`}>
          Create User Account
        </h1>
        <p className={`${darkMode ? 'text-[rgba(220,200,255,0.58)]' : 'text-gray-500'} font-['JetBrains_Mono'] text-[13px] mt-[6px]`}>
          Provision new faculty or student access to NexusEval
        </p>
      </div>

      <div className={`${darkMode ? 'bg-[#08060f]/80 border-indigo-500/10 shadow-2xl' : 'bg-white border-gray-200 shadow-xl'} backdrop-blur-md rounded-[18px] border p-8 relative overflow-hidden`}>
        {darkMode && <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-indigo-500/10 to-transparent pointer-events-none rounded-bl-full"></div>}
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label className={`block ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} font-['JetBrains_Mono'] text-sm tracking-widest uppercase mb-2`}>Full Name</label>
            <input 
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text" 
              className={`w-full ${darkMode ? 'bg-black/40 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'} border rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors font-['JetBrains_Mono'] text-sm`}
              placeholder="e.g. Jane Doe"
            />
          </div>

          <div>
            <label className={`block ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} font-['JetBrains_Mono'] text-sm tracking-widest uppercase mb-2`}>Email Address</label>
            <input 
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email" 
              className={`w-full ${darkMode ? 'bg-black/40 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'} border rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors font-['JetBrains_Mono'] text-sm`}
              placeholder="jane@nexuseval.edu"
            />
          </div>

          <div>
            <label className={`block ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} font-['JetBrains_Mono'] text-sm tracking-widest uppercase mb-2`}>Account Role</label>
            <select
              required
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full ${darkMode ? 'bg-black/40 border-white/10 text-white' : 'bg-gray-50 border-gray-200 text-gray-900'} border rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors font-['JetBrains_Mono'] text-sm`}
            >
              <option value="student" style={{ background: darkMode ? '#08060f' : '#fff' }}>Student</option>
              <option value="teacher" style={{ background: darkMode ? '#08060f' : '#fff' }}>Teacher</option>
              <option value="admin" style={{ background: darkMode ? '#08060f' : '#fff' }}>Administrator</option>
            </select>
          </div>

          <div>
            <label className={`block ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} font-['JetBrains_Mono'] text-sm tracking-widest uppercase mb-2`}>Temporary Password</label>
            <input 
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password" 
              className={`w-full ${darkMode ? 'bg-black/40 border-white/10 text-white placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400'} border rounded-lg px-4 py-3 focus:outline-none focus:border-indigo-500 transition-colors font-['JetBrains_Mono'] text-sm`}
              placeholder="••••••••"
            />
            <p className={`text-[10px] ${darkMode ? 'text-gray-500' : 'text-gray-500'} mt-2 font-['JetBrains_Mono']`}>User will be prompted to change this upon first login.</p>
          </div>

          <button 
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] text-white px-[24px] py-[14px] rounded-[12px] font-bold font-['JetBrains_Mono'] text-[14px] tracking-[2px] uppercase transition-all duration-300 shadow-lg shadow-indigo-500/20"
          >
            Provision User account
          </button>

        </form>
      </div>
    </div>
  );
}
