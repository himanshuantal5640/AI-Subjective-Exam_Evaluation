import React, { useState, useEffect, useRef } from "react";
import { X, Send, Loader, MessageSquare } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { getContacts, getChatHistory, sendMessage } from "../../services/chatService";
import toast from "react-hot-toast";

export default function TeacherChatWindow({ close }) {
  const { darkMode } = useTheme();
  const [message, setMessage] = useState("");
  const [chatWith, setChatWith] = useState("student"); // Recipient type
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await getContacts(chatWith);
        setContacts(data);
        if (data.length > 0) setSelectedUser(data[0]);
      } catch (err) {
        toast.error("Contact Load Failed");
      }
    };
    fetchContacts();
  }, [chatWith]);

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
    <div className={`fixed bottom-24 right-6 w-[20rem] sm:w-[24rem] z-50 border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col ${
      darkMode ? 'bg-[#07100a] border-green-500/20' : 'bg-white border-gray-200'
    }`}>

      {/* Header */}
      <div className={`flex justify-between items-center p-4 font-bold ${
        darkMode ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-black shadow-lg shadow-green-500/20' : 'bg-gradient-to-r from-green-400 to-emerald-500 text-black'
      }`}>
        <div className="flex items-center gap-2">
          <MessageSquare size={18} />
          <span>Faculty Portal Chat</span>
        </div>
        <X className="cursor-pointer hover:rotate-90 transition-transform" onClick={close} size={18} />
      </div>

      {/* Recipient Selection */}
      <div className={`p-3 border-b flex gap-2 ${darkMode ? 'border-green-500/10 bg-black/40' : 'border-gray-100 bg-gray-50'}`}>
        <select
          value={chatWith}
          onChange={(e) => setChatWith(e.target.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold outline-none border transition ${
            darkMode ? 'bg-black/60 text-white border-green-500/20' : 'bg-white text-gray-800 border-gray-300'
          }`}
        >
          <option value="student">Students</option>
          <option value="admin">Admin Support</option>
        </select>

        <select
          value={selectedUser?._id || ""}
          onChange={(e) => setSelectedUser(contacts.find(c => c._id === e.target.value))}
          className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium outline-none border transition ${
            darkMode ? 'bg-black/60 text-white border-green-500/20' : 'bg-white text-gray-800 border-gray-300'
          }`}
        >
          {contacts.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>

      {/* Chat History */}
      <div className="h-64 sm:h-80 overflow-y-auto p-4 space-y-3 font-sans custom-scrollbar">
        {loading && messages.length === 0 ? (
          <div className="flex justify-center py-10"><Loader className="animate-spin text-green-500" /></div>
        ) : messages.length === 0 ? (
          <div className={`text-center py-10 text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            Communication channel active...<br/>Waiting for session start.
          </div>
        ) : (
          messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === selectedUser?._id ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-2.5 rounded-2xl text-xs sm:text-sm ${
                m.sender === selectedUser?._id
                  ? (darkMode ? 'bg-white/5 text-gray-200 rounded-bl-none' : 'bg-gray-100 text-gray-800 rounded-bl-none')
                  : (darkMode ? 'bg-green-600 text-white rounded-br-none shadow-md shadow-green-500/20' : 'bg-green-600 text-white rounded-br-none')
              }`}>
                {m.message}
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className={`p-4 border-t ${darkMode ? 'border-green-500/10 bg-black/20' : 'border-gray-100 bg-white'}`}>
        <div className="flex items-center gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${selectedUser?.name?.split(' ')[0] || '...'}`}
            className={`flex-1 p-2.5 rounded-xl text-sm outline-none border transition ${
              darkMode 
                ? 'bg-black/40 text-white border-green-500/20 focus:border-green-500' 
                : 'bg-gray-50 text-gray-800 border-gray-200 focus:border-green-500 focus:bg-white'
            }`}
          />
          <button
            onClick={handleSend}
            className={`p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 ${
              darkMode ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' : 'bg-green-500 text-black'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}