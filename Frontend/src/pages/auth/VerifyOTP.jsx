import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/api";
import toast from "react-hot-toast";
import PublicNavbar from "../../components/navbars/PublicNavbar";
import ResendOTP from "../../pages/auth/ResendOTP";
import OtpInput from "../../pages/auth/OtpInput";
import ParticleBackground from "../../components/ParticleBackground";

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/verify-otp", form);

      toast.success("Account verified 🎉");

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col
    bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500
    dark:from-gray-900 dark:via-black dark:to-gray-900
    transition-all duration-500"
    >
      <ParticleBackground/>
      <PublicNavbar />

      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white/20 backdrop-blur-xl
          p-10 rounded-2xl shadow-2xl w-96
          text-white animate-fadeIn"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">
            Verify Your Account
          </h2>

          <input
            type="email"
            value={form.email}
            readOnly
            className="w-full mb-4 p-3 rounded-lg
            bg-white/30 text-white"
          />

          <OtpInput setOtp={(value) => setForm({ ...form, otp: value })} />

          <button
            className="w-full bg-black/40
            hover:bg-black/60 transition p-3 rounded-lg"
          >
            Verify Account
          </button>

          <div className="text-center">
            <ResendOTP email={form.email} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
