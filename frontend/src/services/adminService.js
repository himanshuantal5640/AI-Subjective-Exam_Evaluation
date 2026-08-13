import api from "./api";

export const getAllUsers = () => api.get("/admin/users");
export const updateUserRole = (userId, role) => api.put(`/admin/users/${userId}/role`, { role });
export const toggleUserStatus = (userId) => api.put(`/admin/users/${userId}/deactivate`);
export const getAdminExams = () => api.get("/admin/exams");
export const getSystemAnalytics = () => api.get("/admin/system-analytics");
export const getAuditLogs = () => api.get("/admin/audit-logs");
