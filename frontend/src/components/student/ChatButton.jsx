
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatWindow from "./ChatWindow";

export default function ChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 p-4 rounded-full shadow-lg cursor-pointer text-white z-50 hover:scale-110 transition shadow-cyan-500/20"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </div>

      {open && <ChatWindow setChatOpen={setOpen} />}
    </>
  );
}