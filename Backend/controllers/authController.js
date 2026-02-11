
const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    await authService.registerUser(req.body);
    res.status(201).json({ message: "OTP sent" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    await authService.verifyOTP(req.body);
    res.json({ message: "Verified" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { token, role } = await authService.loginUser(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });

    res.json({ role });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
exports.forgotPassword = async (req, res) => {
  try {
    await authService.sendResetOTP(req.body);
    res.json({ message: "OTP sent for password reset" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    await authService.resetPassword(req.body);
    res.json({ message: "Password reset successful" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
