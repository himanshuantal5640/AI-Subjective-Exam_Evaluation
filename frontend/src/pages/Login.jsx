import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../components/ui/AuthCard";
import InputField from "../components/ui/InputField";
import Spinner from "../components/ui/Spinner";
import toast from "react-hot-toast";
import { loginUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
  if (!form.email || !form.password) {
    return toast.error("All fields required");
  }

  try {
    setLoading(true);

    const response = await loginUser({
      email: form.email,
      password: form.password,
    });

    const role = response.data.role;

    if (!role) {
      toast.error("Invalid login response");
      return;
    }

    localStorage.setItem("role", role);

    toast.success("Login Successful 🎉");

    if (role === "student") {
      navigate("/student/dashboard", { replace: true });
    } else if (role === "teacher") {
      navigate("/teacher/dashboard", { replace: true });
    } else if (role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    }

  } catch (err) {
    toast.error(err.response?.data?.message || "Login Failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <AuthCard title="Login">

      <InputField
        type="text"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        passwordToggle={false}
      />

      <InputField
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        passwordToggle
      />

      <div className="text-right text-sm mb-4">
        <Link
          to="/forgot-password"
          className="text-cyan-500 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <button
        onClick={handleLogin}
        className="w-full py-3 rounded-lg 
        bg-gradient-to-r from-cyan-500 to-purple-500 
        text-white font-semibold 
        flex justify-center items-center 
        hover:opacity-90 transition"
      >
        {loading ? <Spinner /> : "Login"}
      </button>

      <p className="text-center text-sm mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-cyan-500 hover:underline">
          Create one
        </Link>
      </p>
    </AuthCard>
  );
}