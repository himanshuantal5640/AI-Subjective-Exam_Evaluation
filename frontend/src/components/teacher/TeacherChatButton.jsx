
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import TeacherChatWindow from "./TeacherChatWindow";

export default function TeacherChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6
        bg-green-600 dark:bg-green-500
        text-white p-4 rounded-full shadow-lg
        hover:scale-110 transition"
      >
        <MessageCircle size={22} />
      </button>

      {open && <TeacherChatWindow close={() => setOpen(false)} />}
    </>
  );
}