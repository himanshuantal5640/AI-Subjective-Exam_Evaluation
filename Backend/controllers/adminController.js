const adminService = require("../services/adminService");

exports.getUsers = async (req, res) => {
  const users = await adminService.getAllUsers();
  res.json(users);
};

exports.updateRole = async (req, res) => {
  const updated = await adminService.updateUserRole(
    req.params.userId,
    req.body.role
  );
  res.json(updated);
};

exports.deactivateUser = async (req, res) => {
  const user = await adminService.deactivateUser(req.params.userId);
  res.json(user);
};

exports.getExams = async (req, res) => {
  const exams = await adminService.getAllExams();
  res.json(exams);
};

exports.deleteExam = async (req, res) => {
  await adminService.deleteExam(req.params.examId);
  res.json({ message: "Exam deleted" });
};

exports.getAuditLogs = async (req, res) => {
  const logs = await adminService.getAllAuditLogs();
  res.json(logs);
};

exports.getSystemAnalytics = async (req, res) => {
  const data = await adminService.getSystemAnalytics();
  res.json(data);
};
