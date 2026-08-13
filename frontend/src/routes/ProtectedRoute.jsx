import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const location = useLocation();
  const role = localStorage.getItem("role");

 
  if (!role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


  if (allowedRole && role !== allowedRole) {

    if (role === "teacher") {
      return <Navigate to="/teacher/dashboard" replace />;
    }

    if (role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    }

    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
