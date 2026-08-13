import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

// Landing
import LandingPage from "./pages/LandingPage";
import Portals from "./components/landing/Portals";
import Features from "./components/landing/Features";
import HowItWorks from "./components/landing/HowItWorks";
import AISection from "./components/landing/AISection";
import Testimonials from "./components/landing/Testimonials";

// Auth
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOTP from "./pages/VerifyOTP";

// Student
import StudentLayout from "./layouts/StudentLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentExams from "./pages/student/StudentExams";
import StudentProfile from "./pages/student/StudentProfile";
import StudentResults from "./pages/student/StudentResults";
import StudentAttendance from "./pages/student/StudentAttendance";
import TakeExam from "./pages/student/TakeExam";

// Teacher
import TeacherLayout from "./layouts/TeacherLayout";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import CreateExam from "./pages/teacher/CreateExam";
import ManageExams from "./pages/teacher/ManageExams";
import TeacherStudents from "./pages/teacher/TeacherStudents";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import ReviewAnswers from "./pages/teacher/ReviewAnswers";
import TeacherAnalytics from "./pages/teacher/TeacherAnalytics";
import ManageQuestions from "./pages/teacher/ManageQuestions";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";

// Admin
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTeachers from "./pages/admin/AdminTeachers";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminExams from "./pages/admin/AdminExams";
import AdminAddUser from "./pages/admin/AdminAddUser";
import AdminLogs from "./pages/admin/AdminLogs";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminProfile from './pages/admin/AdminProfile';

import AdminAssignments from "./pages/admin/AdminAssignments";

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>

          {/* ================= LANDING ================= */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/portals" element={<Portals />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how" element={<HowItWorks />} />
          <Route path="/ai" element={<AISection />} />
          <Route path="/testimonials" element={<Testimonials />} />

          {/* ================= AUTH ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* ================= STUDENT PORTAL ================= */}
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRole="student">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="exams" element={<StudentExams />} />
            <Route path="exam/:examId/take" element={<TakeExam />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="results" element={<StudentResults />} />
            <Route path="attendance" element={<StudentAttendance />} />
          </Route>

          {/* ================= TEACHER PORTAL ================= */}
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRole="teacher">
                <TeacherLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="create" element={<CreateExam />} />
            <Route path="manage" element={<ManageExams />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="exam/:examId/questions" element={<ManageQuestions />} />
            <Route path="review/:examId" element={<ReviewAnswers />} />
            <Route path="attendance/:examId" element={<TeacherAttendance />} />
            <Route path="analytics/:examId" element={<TeacherAnalytics />} />
          </Route>

          {/* ================= ADMIN PORTAL ================= */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="teachers" element={<AdminTeachers />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="exams" element={<AdminExams />} />
            <Route path="add-user" element={<AdminAddUser />} />
            <Route path="logs" element={<AdminLogs />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="assignments" element={<AdminAssignments />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;