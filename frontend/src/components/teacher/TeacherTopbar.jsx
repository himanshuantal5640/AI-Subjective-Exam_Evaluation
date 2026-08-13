import React from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function TeacherTopbar({ setOpen }) {

  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center px-6 py-4
    bg-white dark:bg-[#071a10]
    border-b border-gray-200 dark:border-green-500/20
    transition">

      <div className="flex items-center gap-3">
        <button onClick={() => setOpen(true)} className="md:hidden">
          <Menu />
        </button>

        <h1 className="text-xl font-bold text-gray-800 dark:text-green-400">
          Teacher Portal
        </h1>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-xl bg-gray-200 dark:bg-green-800 text-gray-800 dark:text-white"
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  );
}