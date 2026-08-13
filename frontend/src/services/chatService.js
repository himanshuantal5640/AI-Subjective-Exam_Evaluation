import api from "./api";

export const getChatHistory = (userId) => 
  api.get(`/chat/${userId}`);

export const sendMessage = (receiverId, message) => 
  api.post("/chat/send", { receiver: receiverId, message });

export const getContacts = (role) => {
  if (role === "teacher") return api.get("/users/teachers");
  if (role === "admin") return api.get("/users/admins");
  if (role === "student") return api.get("/users/students");
  return Promise.resolve({ data: [] });
};