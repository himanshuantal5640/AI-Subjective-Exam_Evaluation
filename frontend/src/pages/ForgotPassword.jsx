import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/ui/AuthCard";
import InputField from "../components/ui/InputField";
import Spinner from "../components/ui/Spinner";
import toast from "react-hot-toast";
import { forgotPassword } from "../services/authService";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.includes("@"))
      return toast.error("Enter valid email");

    try {
      setLoading(true);
      await forgotPassword({ email });
      toast.success("Reset OTP sent 📩");
      navigate("/verify-otp", { state: { email, type: "reset" } });
    } catch (err) {
      toast.error(err.response?.data?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Forgot Password">

      <p className="text-center text-sm text-gray-500 dark:text-white/60 mb-6">
        Enter your registered email to receive reset OTP
      </p>

      <InputField
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 rounded-lg
        bg-gradient-to-r from-cyan-500 to-purple-500
        text-white font-semibold
        flex justify-center items-center
        hover:opacity-90 transition"
      >
        {loading ? <Spinner /> : "Continue"}
      </button>

    </AuthCard>
  );
}