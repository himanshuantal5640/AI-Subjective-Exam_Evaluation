// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const sendOTPEmail = require("../config/mailer");

// const generateOTP = () =>
//   Math.floor(100000 + Math.random() * 900000).toString();

// exports.registerUser = async ({ name, email, password, role }) => {
//   const exists = await User.findOne({ email });
//   if (exists) throw new Error("User already exists");

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const otp = generateOTP();

//   await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     role,
//     otp,
//     otpExpiresAt: Date.now() + 10 * 60 * 1000
//   });
//   if (role === "admin") {
//   const existingAdmin =
//     await User.findOne({ role: "admin" });

//   if (existingAdmin)
//     throw new Error("Admin already exists");
// }
//   if (role === "admin") {
//     user.isVerified = false;
//   }


//   await sendOTPEmail(email, otp);
// };

// exports.verifyOTP = async ({ email, otp }) => {
//   const user = await User.findOne({ email });
//   if (!user) throw new Error("User not found");

//   if (user.otp !== otp || user.otpExpiresAt < Date.now())
//     throw new Error("Invalid or expired OTP");

//   user.isVerified = true;
//   user.otp = undefined;
//   user.otpExpiresAt = undefined;
//   await user.save();
// };

// exports.loginUser = async ({ email, password }) => {
//   const user = await User.findOne({ email });
//   if (!user || !user.isVerified)
//     throw new Error("Account not verified");

//   const match = await bcrypt.compare(password, user.password);
//   if (!match) throw new Error("Invalid credentials");

//   const token = jwt.sign(
//     { id: user._id, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   );
//   if (user.role === "admin") {
//   if (user.email !== "himanshuantal26@gmail.com") {
//     throw new Error("Unauthorized admin");
//   }
// }



//   return { token, role: user.role };
// };

// exports.sendResetOTP = async ({ email }) => {
//   const user = await User.findOne({ email });
//   if (!user) throw new Error("User not found");

//   const otp = generateOTP();
//   user.otp = otp;
//   user.otpExpiresAt = Date.now() + 10 * 60 * 1000;

//   await user.save();
//   await sendOTPEmail(email, otp);
// };

// exports.resetPassword = async ({ email, otp, newPassword }) => {
//   const user = await User.findOne({ email });
//   if (!user) throw new Error("User not found");

//   if (user.otp !== otp || user.otpExpiresAt < Date.now())
//     throw new Error("Invalid or expired OTP");

//   user.password = await bcrypt.hash(newPassword, 10);
//   user.otp = undefined;
//   user.otpExpiresAt = undefined;

//   await user.save();
// };

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOTPEmail } = require("../config/mailer");

const ADMIN_EMAIL = "himanshuantal26@gmail.com";

// ================= REGISTER =================
exports.registerUser = async ({ name, email, password, role }) => {

  // Block admin public registration
  if (role === "admin")
    throw new Error("Admin registration is not allowed");

  const existing = await User.findOne({ email });
  if (existing)
    throw new Error("User already exists");
  
  validatePassword(password);
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    isVerified: false,
    isActive: true
  });

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  user.otp = otp;
  user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 min

  await user.save();

  await sendOTPEmail(email, otp);

  return true;
};

// ================= VERIFY OTP (ACCOUNT ACTIVATION) =================
exports.verifyOTP = async ({ email, otp }) => {

  const user = await User.findOne({ email });
  if (!user)
    throw new Error("User not found");

  if (user.isVerified)
    throw new Error("Account already verified");

  if (!user.otp || !user.otpExpiresAt)
    throw new Error("No OTP found");

  // Check expired first
  if (user.otpExpiresAt < Date.now())
    throw new Error("OTP expired");

  // Wrong OTP
  if (user.otp !== otp) {

    user.otpAttempts += 1;
    await user.save();

    if (user.otpAttempts >= 5)
      throw new Error("Too many invalid attempts. Please resend OTP.");

    throw new Error("Invalid OTP");
  }

  // SUCCESS
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiresAt = undefined;
  user.otpAttempts = 0;

  await user.save();

  return true;
};


// ================= LOGIN =================
exports.loginUser = async ({ email, password }) => {

  const user = await User.findOne({ email });
  if (!user)
    throw new Error("User not found");

  if (!user.isActive)
    throw new Error("Account deactivated");

  if (!user.isVerified)
    throw new Error("Account not verified");

  // Admin restriction
  if (user.role === "admin" && user.email !== ADMIN_EMAIL)
    throw new Error("Unauthorized admin");

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, role: user.role };
};

// ================= FORGOT PASSWORD =================
exports.sendResetOTP = async ({ email }) => {

  const user = await User.findOne({ email });
  if (!user)
    throw new Error("User not found");

  // Restrict admin reset
  if (user.role === "admin" && user.email !== ADMIN_EMAIL)
    throw new Error("Unauthorized admin reset");

  const otp = Math.floor(100000 + 900000 * Math.random()).toString();

  user.otp = otp;
  user.otpExpiresAt = Date.now() + 10 * 60 * 1000;

  await user.save();

  await sendOTPEmail(email, otp);

  return true;
};

// ================= RESET PASSWORD =================
exports.resetPassword = async ({ email, otp, newPassword }) => {

  const user = await User.findOne({ email });
  if (!user)
    throw new Error("User not found");

  if (user.role === "admin" && user.email !== ADMIN_EMAIL)
    throw new Error("Unauthorized admin reset");

  if (
    user.otp !== otp ||
    user.otpExpiresAt < Date.now()
  )
    throw new Error("Invalid or expired OTP");


  validatePassword(newPassword);

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.otp = undefined;
  user.otpExpiresAt = undefined;

  await user.save();

  return true;
};

exports.resendOTP = async ({ email }) => {

  const user = await User.findOne({ email });
  if (!user)
    throw new Error("User not found");

  if (user.isVerified)
    throw new Error("Account already verified");

  // Prevent spam (1 minute cooldown)
  if (
    user.otpLastSentAt &&
    Date.now() - user.otpLastSentAt < 60 * 1000
  )
    throw new Error("Please wait before requesting again");

  const otp = Math.floor(100000 + 900000 * Math.random()).toString();

  user.otp = otp;
  user.otpExpiresAt = Date.now() + 10 * 60 * 1000;
  user.otpLastSentAt = Date.now();
  user.otpResendCount += 1;

  await user.save();

  await sendOTPEmail(email, otp);

  return true;
};


const validatePassword = (password) => {

  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  if (!strongPasswordRegex.test(password)) {
    throw new Error(
      "Password must be 8+ chars, include uppercase, lowercase, number & special character"
    );
  }
};
