import React from "react";
import { useState, useEffect } from "react";
import api from "../../api/api";
import toast from "react-hot-toast";

const ResendOTP = ({ email }) => {

  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = async () => {
    try {
      setLoading(true);

      await api.post("/auth/resend-otp", { email });

      toast.success("OTP resent 📩");

      setTimer(60);

    } catch (err) {
      toast.error("Failed to resend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3 text-center">

      {timer > 0 ? (
        <p className="text-sm text-indigo-200">
          Resend in {timer}s
        </p>
      ) : (
        <button
          onClick={handleResend}
          disabled={loading}
          className="text-sm text-indigo-300 hover:text-white transition"
        >
          {loading ? "Sending..." : "Resend OTP"}
        </button>
      )}

    </div>
  );
};

export default ResendOTP;
