const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendOTPEmail = require("../config/mailer");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.registerUser = async ({ name, email, password, role }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = generateOTP();

  await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    otp,
    otpExpiresAt: Date.now() + 10 * 60 * 1000
  });

  await sendOTPEmail(email, otp);
};

exports.verifyOTP = async ({ email, otp }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  if (user.otp !== otp || user.otpExpiresAt < Date.now())
    throw new Error("Invalid or expired OTP");

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiresAt = undefined;
  await user.save();
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !user.isVerified)
    throw new Error("Account not verified");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, role: user.role };
};

exports.sendResetOTP = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpiresAt = Date.now() + 10 * 60 * 1000;

  await user.save();
  await sendOTPEmail(email, otp);
};

exports.resetPassword = async ({ email, otp, newPassword }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  if (user.otp !== otp || user.otpExpiresAt < Date.now())
    throw new Error("Invalid or expired OTP");

  user.password = await bcrypt.hash(newPassword, 10);
  user.otp = undefined;
  user.otpExpiresAt = undefined;

  await user.save();
};
