import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthCard from "../components/ui/AuthCard";
import InputField from "../components/ui/InputField";
import Spinner from "../components/ui/Spinner";
import { resetPassword } from "../services/authService";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const email = state?.email;
  const otp = state?.otp;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    const strong =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return strong.test(password);
  };

  const getStrength = (password) => {
    if (!password) return "";
    if (validatePassword(password)) return "Strong";
    if (password.length >= 6) return "Medium";
    return "Weak";
  };

  const handleReset = async () => {
    if (!newPassword || !confirmPassword)
      return toast.error("All fields required");

    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");

    if (!validatePassword(newPassword))
      return toast.error(
        "Password must be 8+ chars, include uppercase, lowercase, number & special character"
      );

    try {
      setLoading(true);

      await resetPassword({
        email,
        otp,
        newPassword
      });

      toast.success("Password Updated Successfully 🎉");
      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Reset Password">

      <p className="text-center text-sm text-gray-500 dark:text-white/60 mb-6">
        Create a new strong password
      </p>

      <InputField
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
        passwordToggle
      />

      <p className="text-sm mb-4 text-cyan-500">
        Strength: {getStrength(newPassword)}
      </p>

      <InputField
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        passwordToggle
      />

      <button
        onClick={handleReset}
        disabled={loading}
        className="w-full py-3 rounded-lg
        bg-gradient-to-r from-cyan-500 to-purple-500
        text-white font-semibold
        flex justify-center items-center
        hover:opacity-90 transition"
      >
        {loading ? <Spinner /> : "Update Password"}
      </button>

    </AuthCard>
  );
}