


import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthCard from "../components/ui/AuthCard";
import toast from "react-hot-toast";
import { verifyOTP, resendOTP } from "../services/authService";
import Spinner from "../components/ui/Spinner";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5)
      inputsRef.current[index + 1].focus();
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputsRef.current[index - 1].focus();
  };

  const handleVerify = async () => {
  const finalOtp = otp.join("");

  if (finalOtp.length !== 6)
    return toast.error("Enter complete OTP");

  try {
    setLoading(true);

    if (state?.type === "reset") {
      navigate("/reset-password", {
        state: { email, otp: finalOtp }
      });
    } else {
      await verifyOTP({ email, otp: finalOtp });
      toast.success("Account Verified 🎉");
      navigate("/login");
    }

  } catch (err) {
    toast.error(err.response?.data?.message || "Invalid OTP");
  } finally {
    setLoading(false);
  }
};
  const handleResend = async () => {
    try {
      await resendOTP({ email });
      toast.success("OTP Resent");
      setTimer(30);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <AuthCard title="Verify OTP">

      <p className="text-center text-sm text-gray-500 dark:text-white/60 mb-6">
        Enter the 6-digit code sent to your email
      </p>

      <div className="flex justify-center gap-3 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-semibold
            rounded-xl border 
            bg-gray-100 dark:bg-[#1a1a1a]
            border-gray-300 dark:border-white/10
            text-gray-800 dark:text-white
            focus:ring-2 focus:ring-cyan-500
            transition-all"
          />
        ))}
      </div>

      <button
        onClick={handleVerify}
        disabled={loading}
        className="w-full py-3 rounded-lg
        bg-gradient-to-r from-cyan-500 to-purple-500
        text-white font-semibold
        flex justify-center items-center
        hover:opacity-90 transition"
      >
        {loading ? <Spinner /> : "Verify OTP"}
      </button>

      <div className="text-center mt-5 text-sm">
        {timer > 0 ? (
          <span className="text-gray-500 dark:text-white/60">
            Resend in <span className="font-semibold text-cyan-500">{timer}s</span>
          </span>
        ) : (
          <button
            onClick={handleResend}
            className="text-cyan-500 font-medium hover:underline"
          >
            Resend OTP
          </button>
        )}
      </div>

    </AuthCard>
  );
}