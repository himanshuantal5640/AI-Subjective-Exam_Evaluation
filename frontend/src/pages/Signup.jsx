

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../components/ui/AuthCard";
import InputField from "../components/ui/InputField";
import Spinner from "../components/ui/Spinner";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const validatePassword = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    return strongRegex.test(password);
  };

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password)
      return toast.error("All fields required");

    if (!validatePassword(form.password))
      return toast.error(
        "Password must be 8+ chars, include uppercase, lowercase, number & special character",
      );

    try {
      setLoading(true);
      await registerUser(form);
      toast.success("OTP sent for verification 🎉");
      navigate("/verify-otp", { state: { email: form.email } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Create Account">
      <InputField
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
      />

      <InputField
        type="text"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />

      <InputField
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        passwordToggle
      />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-3 rounded-lg
        bg-gray-100 dark:bg-[#1a1a1a]
        border border-gray-300 dark:border-white/10"
      >
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>

      <button
        type="button"
        onClick={handleSignup}
        disabled={loading}
        className="w-full py-3 rounded-lg
        bg-gradient-to-r from-cyan-500 to-purple-500
        text-white font-semibold
        flex justify-center items-center
        hover:opacity-90 transition"
      >
        {loading ? <Spinner /> : "Create Account"}
      </button>

      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-cyan-500 hover:underline">
          Login
        </Link>
      </p>
    </AuthCard>
  );
}
