import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TeacherSidebar from "../components/layout/TeacherSidebar";
import TeacherTopbar from "../components/teacher/TeacherTopbar";
import TeacherChatButton from "../components/teacher/TeacherChatButton";
import { useTheme } from "../context/ThemeContext"; // Added to force re-render on theme change maybe?

export default function TeacherLayout() {
  const [open, setOpen] = useState(false);
  const { darkMode } = useTheme();

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${darkMode ? "dark bg-[#04120a]" : "bg-gray-50"}`}>
      <TeacherSidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">

        <TeacherTopbar setOpen={setOpen} />

        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>

      <TeacherChatButton />
    </div>
  );
}