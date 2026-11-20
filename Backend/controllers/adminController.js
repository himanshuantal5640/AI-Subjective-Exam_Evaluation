const adminService = require("../services/adminService");

exports.getUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const updated = await adminService.updateUserRole(
      req.params.userId,
      req.body.role
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deactivateUser = async (req, res) => {
  try {
    const user = await adminService.deactivateUser(req.params.userId);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await adminService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getExams = async (req, res) => {
  try {
    const exams = await adminService.getAllExams();
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    await adminService.deleteExam(req.params.examId);
    res.json({ message: "Exam deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await adminService.getAllAuditLogs();
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSystemAnalytics = async (req, res) => {
  try {
    const data = await adminService.getSystemAnalytics();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.assignMapping = async (req, res) => {
  try {
    const { studentId, teacherIds } = req.body;
    const result = await adminService.assignTeachersToStudent(studentId, teacherIds);
    res.json(result);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
