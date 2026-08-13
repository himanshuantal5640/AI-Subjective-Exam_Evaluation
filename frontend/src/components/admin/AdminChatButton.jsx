import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import AdminChatWindow from "./AdminChatWindow";
import { useTheme } from "../../context/ThemeContext";

export default function AdminChatButton() {
  const [open, setOpen] = useState(false);
  const { darkMode } = useTheme();

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full shadow-lg hover:scale-110 transition z-50 ${
          darkMode 
            ? "bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]" 
            : "bg-indigo-600 text-white shadow-indigo-500/20"
        }`}
      >
        <MessageCircle size={24} />
      </button>

      {open && <AdminChatWindow close={() => setOpen(false)} />}
    </>
  );
}
