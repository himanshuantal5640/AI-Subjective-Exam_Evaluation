import React, { useState, useEffect, useRef } from "react";
import { X, Send, User, Shield, Loader } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { getContacts, getChatHistory, sendMessage } from "../../services/chatService";
import toast from "react-hot-toast";

export default function AdminChatWindow({ close }) {
  const { darkMode } = useTheme();
  const [message, setMessage] = useState("");
  const [chatWith, setChatWith] = useState("teacher"); // Recipient type
  const [contacts, setContacts] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Load contacts based on role
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

  // Load chat history when selectedUser changes
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
    const interval = setInterval(fetchHistory, 5000); // Polling for new messages
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
      toast.error("Transmission Error");
    }
  };

  return (
    <div className={`fixed bottom-24 right-6 w-[22rem] sm:w-[26rem] z-50 border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300 flex flex-col ${
      darkMode ? 'bg-[#080614] border-indigo-500/20' : 'bg-white border-gray-200'
    }`}>

      {/* Header */}
      <div className={`flex justify-between items-center p-4 font-bold ${
        darkMode ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white' : 'bg-gradient-to-r from-indigo-600 to-violet-700 text-white'
      }`}>
        <div className="flex items-center gap-2">
          <Shield size={18} />
          <span>Nexus Admin Intelligence</span>
        </div>
        <X className="cursor-pointer hover:rotate-90 transition-transform" onClick={close} size={20} />
      </div>

      {/* Selection Control */}
      <div className={`p-3 border-b flex gap-2 ${darkMode ? 'border-white/5 bg-black/40' : 'border-gray-100 bg-gray-50'}`}>
        <select
          value={chatWith}
          onChange={(e) => setChatWith(e.target.value)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold outline-none border transition ${
            darkMode ? 'bg-black/60 text-white border-white/10' : 'bg-white text-gray-800 border-gray-300'
          }`}
        >
          <option value="teacher">Faculty Dept</option>
          <option value="student">Student Body</option>
        </select>

        <select
          value={selectedUser?._id || ""}
          onChange={(e) => setSelectedUser(contacts.find(c => c._id === e.target.value))}
          className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium outline-none border transition ${
            darkMode ? 'bg-black/60 text-white border-white/10' : 'bg-white text-gray-800 border-gray-300'
          }`}
        >
          {contacts.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>

      {/* Chat Area */}
      <div className="h-64 sm:h-80 overflow-y-auto p-4 space-y-3 font-sans custom-scrollbar">
        {loading && messages.length === 0 ? (
          <div className="flex justify-center py-10"><Loader className="animate-spin text-indigo-500" /></div>
        ) : messages.length === 0 ? (
          <div className={`text-center py-10 text-xs ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            Secure connection established...<br/>Waiting for session start.
          </div>
        ) : (
          messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.sender === selectedUser?._id ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-2.5 rounded-2xl text-xs md:text-sm ${
                m.sender === selectedUser?._id
                  ? (darkMode ? 'bg-white/5 text-gray-200 rounded-bl-none' : 'bg-gray-100 text-gray-800 rounded-bl-none')
                  : (darkMode ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-indigo-600 text-white rounded-br-none')
              }`}>
                {m.message}
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className={`p-4 border-t ${darkMode ? 'border-white/5 bg-black/20' : 'border-gray-100 bg-white'}`}>
        <div className="flex items-center gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Message ${selectedUser?.name?.split(' ')[0] || '...'}`}
            className={`flex-1 p-2.5 rounded-xl text-sm outline-none border transition ${
              darkMode 
                ? 'bg-[#110e1c] text-white border-white/10 focus:border-indigo-500' 
                : 'bg-gray-50 text-gray-800 border-gray-200 focus:border-indigo-500 focus:bg-white'
            }`}
          />
          <button
            onClick={handleSend}
            className={`p-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 ${
              darkMode ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
