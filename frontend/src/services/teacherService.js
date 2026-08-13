import api from "./api";

// EXAMS
export const createExam = (data) =>
  api.post("/exams/create", data);

export const getMyExams = () =>
  api.get("/exams/my-exams");

export const toggleExamStatus = (examId) =>
  api.put(`/exams/${examId}/toggle-status`);

// ATTENDANCE
export const getExamAttendance = (examId) => 
  api.get(`/attendance/exam/${examId}`);

export const markAttendance = (examId, studentId, status) => 
  api.post("/attendance/mark", { examId, studentId, status });

// QUESTIONS
export const getQuestions = (examId) =>
  api.get(`/questions/${examId}`);

export const addQuestion = (data) =>
  api.post("/questions/add", data);

// REVIEW
export const getExamSubmissions = (examId) =>
  api.get(`/review/exam/${examId}`);

export const overrideScore = (answerId, score, comment) =>
  api.put(`/review/override/${answerId}`, { teacherFinalScore: score, teacherComment: comment });

export const evaluateWithAI = (answerId) =>
  api.post(`/review/evaluate-ai/${answerId}`);

// ANALYTICS
export const getTeacherAnalytics = (examId) =>
  api.get(`/analytics/teacher/${examId}`);

// PROFILE
export const getTeacherProfile = () =>
  api.get("/users/me");

export const updateTeacherProfile = (data) =>
  api.put("/users/update", data);