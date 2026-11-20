import api from "./api";

export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);
export const verifyOTP = (data) => api.post("/auth/verify-otp", data);
export const forgotPassword = (data) => api.post("/auth/forgot-password", data);
export const resetPassword = (data) => api.post("/auth/reset-password", data);
export const resendOTP = (data) => api.post("/auth/resend-otp", data);
export const logoutUser = () => api.post("/auth/logout");
