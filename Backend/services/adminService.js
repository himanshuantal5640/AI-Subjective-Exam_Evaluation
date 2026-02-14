const User = require("../models/User");
const Exam = require("../models/Exam");
const AuditLog = require("../models/AuditLog");
const Answer = require("../models/Answer");

exports.getAllUsers = async () => {
  return await User.find().select("-password");
};

exports.updateUserRole = async (userId, role) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.role = role;
  await user.save();

  return user;
};

exports.deactivateUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.isActive = false;
  await user.save();

  return user;
};

exports.getAllExams = async () => {
  return await Exam.find().populate("teacherId", "name email");
};

exports.deleteExam = async (examId) => {
  return await Exam.findByIdAndDelete(examId);
};

exports.getAllAuditLogs = async () => {
  return await AuditLog.find()
    .populate("teacherId", "name email")
    .populate("answerId");
};

exports.getSystemAnalytics = async () => {
  const totalUsers = await User.countDocuments();
  const totalExams = await Exam.countDocuments();
  const totalAnswers = await Answer.countDocuments();

  return {
    totalUsers,
    totalExams,
    totalAnswers
  };
};
