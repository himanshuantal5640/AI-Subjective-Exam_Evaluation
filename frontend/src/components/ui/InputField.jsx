

import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function InputField({
  type,
  name,           
  placeholder,
  value,
  onChange,
  passwordToggle
}) {
  const [show, setShow] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="relative mb-4">
      <input
        type={isPassword && !show ? "password" : "text"}
        name={name}                 // ✅ ADD THIS
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg 
        bg-gray-100 dark:bg-[#1a1a1a] 
        border border-gray-300 dark:border-white/10 
        text-gray-800 dark:text-white
        focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />

      {isPassword && passwordToggle && (
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-3 text-gray-500 dark:text-white/60"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}