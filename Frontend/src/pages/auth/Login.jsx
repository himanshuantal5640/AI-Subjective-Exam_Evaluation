import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import PublicNavbar from "../../components/navbars/PublicNavbar";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      login(res.data.role);

      toast.success("Login successful 🎉");

      if (res.data.role === "student") {
        navigate("/student/dashboard");
      } else if (res.data.role === "teacher") {
        navigate("/teacher/dashboard");
      } else if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <PublicNavbar />

      <div className="flex items-center justify-center mt-20">
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 
          p-6 rounded shadow w-80 
          text-black dark:text-white"
        >
          <h2 className="text-xl font-bold mb-4">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded 
            bg-gray-50 dark:bg-gray-700"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border rounded 
            bg-gray-50 dark:bg-gray-700"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            className="w-full bg-blue-500 
            hover:bg-blue-600 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
