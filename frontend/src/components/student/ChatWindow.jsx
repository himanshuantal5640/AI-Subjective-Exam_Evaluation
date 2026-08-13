import React, { useEffect, useState, useRef } from "react";
import { getChatHistory, sendMessage, getContacts } from "../../services/chatService";
import { X, Send, Loader, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function ChatWindow({ setChatOpen }) {
  const [chatWith, setChatWith] = useState("teacher"); // Recipient type
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    fetchContacts();
  }, [chatWith]);

  const fetchContacts = async () => {
    try {
      const { data } = await getContacts(chatWith);
      setContacts(data);
      if (data.length > 0) setSelectedUser(data[0]);
    } catch (err) {
      toast.error(`Failed to load ${chatWith}s`);
    }
  };

  useEffect(() => {
    if (!selectedUser) return;
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const { data } = await getChatHistory(selectedUser._id);
        setMessages(data);
      } catch (err) {
        console.error("History fetch failed");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
    const interval = setInterval(fetchHistory, 5000);
    return () => clearInterval(interval);
  }, [selectedUser]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || !selectedUser) return;
    try {
      const { data } = await sendMessage(selectedUser._id, message);
      setMessages([...messages, data]);
      setMessage("");
    } catch (err) {
      toast.error("Send Failed");
    }
  };

  return (
    <div className="fixed bottom-24 right-6 w-[18rem] sm:w-[22rem] z-50 bg-white dark:bg-[#0b1622] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border dark:border-white/10 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b dark:border-white/10 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} />
          <h4 className="font-bold text-sm tracking-wide font-['Orbitron']">Nexus Chat</h4>
        </div>
        <X className="cursor-pointer hover:rotate-90 transition-transform" onClick={() => setChatOpen(false)} size={18} />
      </div>

      {/* Recipient Selector Cluster */}
      <div className="p-3 border-b dark:border-white/10 bg-gray-50 dark:bg-black/20 flex flex-col gap-2">
        <select
          value={chatWith}
          onChange={(e) => setChatWith(e.target.value)}
          className="w-full p-2 rounded-lg text-[10px] font-black uppercase tracking-widest bg-white dark:bg-[#1a2533] text-blue-500 dark:text-blue-400 border dark:border-white/10 outline-none"
        >
          <option value="teacher">Faculty Members</option>
          <option value="admin">Admin Support</option>
        </select>

        <select
          value={selectedUser?._id || ""}
          onChange={(e) => setSelectedUser(contacts.find(t => t._id === e.target.value))}
          className="w-full p-2 rounded-lg text-xs font-medium bg-white dark:bg-[#1a2533] text-gray-800 dark:text-white border dark:border-white/10 outline-none"
        >
          {contacts.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
          {contacts.length === 0 && <option disabled>No contacts available</option>}
        </select>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto min-h-[16rem] max-h-[22rem] space-y-3 custom-scrollbar font-['JetBrains_Mono']">
        {loading && messages.length === 0 ? (
          <div className="flex justify-center py-10"><Loader className="animate-spin text-cyan-500" /></div>
        ) : messages.length === 0 ? (
          <div className="text-center py-10 text-[10px] uppercase tracking-widest text-gray-400">
            Secure connection initialized...<br/>Waiting for exchange.
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={`flex ${m.sender === selectedUser?._id ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-[11px] md:text-xs shadow-sm ${
                m.sender === selectedUser?._id
                  ? 'bg-gray-100 dark:bg-white/5 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  : 'bg-blue-600 text-white rounded-br-none shadow-blue-500/10'
              }`}>
                {m.message}
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t dark:border-white/10 bg-gray-50 dark:bg-black/20">
        <div className="flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type message..."
            className="flex-1 p-2 rounded-xl text-sm bg-white dark:bg-[#1a2533] text-gray-800 dark:text-white border dark:border-white/10 outline-none"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/20 active:scale-95 transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}