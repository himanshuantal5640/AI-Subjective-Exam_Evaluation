import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/auth` : "http://localhost:5000/api/auth",
  withCredentials: true
});

export const loginUser = (data) => API.post("/login", data);
export const registerUser = (data) => API.post("/register", data);
export const verifyOTP = (data) => API.post("/verify-otp", data);
export const forgotPassword = (data) => API.post("/forgot-password", data);
export const resetPassword = (data) => API.post("/reset-password", data);
export const resendOTP = (data) => API.post("/resend-otp", data);
export const logoutUser = () => API.post("/logout");

