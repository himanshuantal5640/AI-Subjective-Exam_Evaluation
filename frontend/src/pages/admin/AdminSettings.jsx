import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function AdminSettings() {
  const { darkMode } = useTheme();
  return (
    <div className="max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[32px] gap-[15px]">
        <div>
          <h1 className={`text-[28px] md:text-[34px] font-bold font-['Orbitron'] ${darkMode ? 'text-white' : 'text-gray-900'} tracking-[1px] leading-tight`}>
            System Settings
          </h1>
          <p className={`${darkMode ? 'text-[rgba(220,200,255,0.58)]' : 'text-gray-500'} font-['JetBrains_Mono'] text-[13px] mt-[6px]`}>
            Global configuration and environment parameters
          </p>
        </div>
        <button className="bg-gradient-to-r from-[#dc50ff] to-[#ff3d6e] hover:shadow-[0_0_20px_rgba(220,80,255,0.4)] text-white px-[24px] py-[12px] rounded-[12px] font-bold font-['JetBrains_Mono'] text-[13px] tracking-[1px] uppercase transition-all duration-300">
          Save Changes
        </button>
      </div>

      <div className={`${darkMode ? 'bg-[#08060f]/80 border-indigo-500/10 shadow-2xl' : 'bg-white border-gray-200 shadow-xl'} backdrop-blur-md rounded-[18px] border p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700`}>
        
        <section>
          <h2 className={`text-xl font-bold font-['Orbitron'] ${darkMode ? 'text-white border-indigo-500/20' : 'text-gray-900 border-gray-100'} mb-6 border-b pb-2 flex items-center gap-2`}>
            <span className="text-indigo-500">{"//"}</span> AI Evaluation Engine
          </h2>
          <div className="space-y-6 font-['JetBrains_Mono']">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} font-semibold`}>Enable Hybrid Scoring</span>
                <input type="checkbox" className="w-5 h-5 accent-indigo-500" defaultChecked />
              </div>
              <p className={`text-[12px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} leading-relaxed`}>
                Integrates deterministic rule-based logic with GPT-driven semantic analysis to provide grounded and reliable scores.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} font-semibold`}>AI Confidence Threshold</span>
                <select className={`${darkMode ? 'bg-[#110e1c] border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded px-3 py-1.5 ${darkMode ? 'text-white' : 'text-gray-900'} focus:outline-none focus:border-indigo-500 transition-colors`}>
                  <option style={{ background: darkMode ? '#110e1c' : '#fff' }}>High (90%+)</option>
                  <option style={{ background: darkMode ? '#110e1c' : '#fff' }}>Medium (75%+)</option>
                  <option style={{ background: darkMode ? '#110e1c' : '#fff' }}>Low (Any)</option>
                </select>
              </div>
              <p className={`text-[12px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} leading-relaxed`}>
                Determines the minimum certainty level required for the AI to publish a score without flagging it for human audit.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} font-semibold`}>Auto-audit Low Confidence</span>
                <input type="checkbox" className="w-5 h-5 accent-indigo-500" defaultChecked />
              </div>
              <p className={`text-[12px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} leading-relaxed`}>
                Automatically flags evaluations that fall below the confidence threshold for mandatory teacher review.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className={`text-xl font-bold font-['Orbitron'] ${darkMode ? 'text-white border-indigo-500/20' : 'text-gray-900 border-gray-100'} mb-6 border-b pb-2 flex items-center gap-2`}>
            <span className="text-violet-500">{"//"}</span> Security & Access
          </h2>
          <div className="space-y-6 font-['JetBrains_Mono']">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} font-semibold`}>Faculty 2FA Required</span>
                <input type="checkbox" className="w-5 h-5 accent-violet-500" defaultChecked />
              </div>
              <p className={`text-[12px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} leading-relaxed`}>
                Enforces OTP-based two-factor authentication for all users with 'teacher' or 'admin' roles during login.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} font-semibold`}>System Session Timeout</span>
                <div className="flex items-center gap-3">
                  <input type="number" defaultValue={60} className={`w-24 ${darkMode ? 'bg-[#110e1c] border-gray-700' : 'bg-gray-50 border-gray-200 shadow-sm'} border rounded px-3 py-1.5 ${darkMode ? 'text-white' : 'text-gray-900'} focus:outline-none focus:border-violet-500 transition-all`} />
                  <span className={`text-[12px] ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>MIN</span>
                </div>
              </div>
              <p className={`text-[12px] ${darkMode ? 'text-gray-500' : 'text-gray-400'} leading-relaxed`}>
                Sets the duration of inactivity before an administrative or faculty session is automatically terminated.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
