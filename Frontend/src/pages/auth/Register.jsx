import React from "react";
import { useState } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";
import PublicNavbar from "../../components/navbars/PublicNavbar";

const Register = () => {

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
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
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

          <h2 className="text-xl font-bold mb-4">
            Register
          </h2>

          <input
            type="text"
            placeholder="Name"
            className="w-full mb-3 p-2 border rounded 
            bg-gray-50 dark:bg-gray-700"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded 
            bg-gray-50 dark:bg-gray-700"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-3 p-2 border rounded 
            bg-gray-50 dark:bg-gray-700"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            className="w-full mb-3 p-2 border rounded 
            bg-gray-50 dark:bg-gray-700"
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>

          <button
            className="w-full bg-green-500 
            hover:bg-green-600 text-white p-2 rounded"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  );
};

export default Register;
