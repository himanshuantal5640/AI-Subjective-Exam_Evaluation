const User = require("../models/User");
const Exam = require("../models/Exam");
const AuditLog = require("../models/AuditLog");
const Answer = require("../models/Answer");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async () => {
  const users = await User.find().select("-password");

  const usersWithStats = await Promise.all(
    users.map(async (user) => {
      const userObj = user.toObject();

      if (user.role === "teacher") {
        userObj.generatedExams = await Exam.countDocuments({ teacherId: user._id });
      } else if (user.role === "student") {
        const answers = await Answer.find({ studentId: user._id });

        const uniqueExams = new Set();
        let totalScore = 0;
        let scoredAnswersCount = 0;

        answers.forEach((ans) => {
          if (ans.examId) uniqueExams.add(ans.examId.toString());
          const score = ans.hybridFinalScore || ans.teacherFinalScore || ans.aiFinalScore || ans.score;
          if (score !== undefined && score !== null) {
            totalScore += score;
            scoredAnswersCount++;
          }
        });

        userObj.examsTaken = uniqueExams.size;
        userObj.avgScore = scoredAnswersCount > 0 ? Math.round(totalScore / scoredAnswersCount) : 0;
      }

      return userObj;
    })
  );

  return usersWithStats;
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

  // Toggle active state
  user.isActive = !user.isActive;
  await user.save();

  return user;
};

exports.createUser = async ({ name, email, password, role }) => {
  if (!name || !email || !password || !role) {
    throw new Error("All fields required");
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    isVerified: true, // Admin-created users are pre-verified
    isActive: true
  });

  return user;
};

exports.getAllExams = async () => {
  const exams = await Exam.find().populate("teacherId", "name email");

  const examsWithStats = await Promise.all(
    exams.map(async (exam) => {
      const examObj = exam.toObject();
      const submissionCount = await Answer.countDocuments({ examId: exam._id });
      examObj.submissions = { length: submissionCount };
      return examObj;
    })
  );

  return examsWithStats;
};

exports.deleteExam = async (examId) => {
  return await Exam.findByIdAndDelete(examId);
};

exports.getAllAuditLogs = async () => {
  return await AuditLog.find()
    .populate("teacherId", "name email")
    .populate("answerId")
    .sort({ createdAt: -1 });
};

exports.getSystemAnalytics = async () => {
  const totalUsers = await User.countDocuments();
  const teacherCount = await User.countDocuments({ role: "teacher" });
  const studentCount = await User.countDocuments({ role: "student" });
  const totalExams = await Exam.countDocuments();
  const activeExams = await Exam.countDocuments({ status: "active" });
  const totalAnswers = await Answer.countDocuments();

  return {
    totalUsers,
    teacherCount,
    studentCount,
    totalExams,
    activeExams,
    totalAnswers,
    liveSessions: Math.floor(Math.random() * 5) + 1,
    avgPassRate: 76
  };
};

exports.assignTeachersToStudent = async (studentId, teacherIds) => {
  // 1. Update Student's assignedTeachers
  await User.findByIdAndUpdate(studentId, {
    assignedTeachers: teacherIds
  });

  // 2. Update Teachers' students list (Many-to-Many sync)
  await User.updateMany(
    { role: "teacher" },
    { $pull: { students: studentId } }
  );

  await User.updateMany(
    { _id: { $in: teacherIds } },
    { $addToSet: { students: studentId } }
  );

  return { message: "Mapping updated successfully" };
};
