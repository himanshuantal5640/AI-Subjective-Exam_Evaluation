import api from "./api";

// Fetch all available exams for students
export const getAvailableExams = () => api.get("/exams/available");

// Existing answers logic can be migrated here if needed or kept where it is
export const getMyResults = () => api.get("/answers/my-results");

export const getMyAttendance = () => api.get("/attendance/my-attendance");
