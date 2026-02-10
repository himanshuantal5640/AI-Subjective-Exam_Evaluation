const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    await authService.registerUser(req.body);
    res.status(201).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    await authService.verifyOTP(req.body);
    res.json({ message: "Account verified" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await authService.loginUser(req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    await authService.sendResetOTP(req.body);
    res.json({ message: "OTP sent for password reset" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    await authService.resetPassword(req.body);
    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
