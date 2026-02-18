import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";
import PublicNavbar from "../../components/navbars/PublicNavbar";

const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);

      toast.success("OTP sent to your email 📩");

      // Redirect to verify page with email
      navigate("/verify-otp", {
        state: { email: form.email }
      });

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen 
    bg-gradient-to-br from-indigo-500 to-purple-600
    dark:from-gray-900 dark:to-black">

      <PublicNavbar />

      <div className="flex justify-center items-center mt-16">

        <form
          onSubmit={handleSubmit}
          className="bg-white/20 backdrop-blur-lg 
          p-8 rounded-xl shadow-2xl w-96
          text-white"
        >

          <h2 className="text-2xl font-bold mb-6 text-center">
            Create Account
          </h2>

          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full mb-4 p-3 rounded
            bg-white/30 placeholder-white focus:outline-none"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full mb-4 p-3 rounded
            bg-white/30 placeholder-white focus:outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full mb-4 p-3 rounded
            bg-white/30 placeholder-white focus:outline-none"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            className="w-full mb-6 p-3 rounded
            bg-white/30 focus:outline-none"
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button
            className="w-full bg-black/40 
            hover:bg-black/60 transition p-3 rounded"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
};

export default Register;
