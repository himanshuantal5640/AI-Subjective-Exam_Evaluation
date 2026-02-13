const Answer = require("../models/Answer");
const AuditLog = require("../models/AuditLog");

exports.getAnswersByExam = async (examId) => {
  return await Answer.find({ examId })
    .populate("studentId", "name email")
    .populate("questionId", "text");
};

exports.overrideScore = async (
  answerId,
  teacherId,
  teacherFinalScore,
  teacherComment
) => {
  const answer = await Answer.findById(answerId);
  if (!answer) throw new Error("Answer not found");

  // Create audit log BEFORE updating
  await AuditLog.create({
    answerId,
    teacherId,
    aiFinalScore: answer.aiFinalScore,
    previousTeacherScore: answer.teacherFinalScore,
    newTeacherScore: teacherFinalScore,
    teacherComment
  });

  // Update answer
  answer.teacherFinalScore = teacherFinalScore;
  answer.teacherComment = teacherComment;
  answer.isOverridden = true;

  await answer.save();

  return answer;
};

exports.getAuditLogsForAnswer = async (answerId) => {
  return await AuditLog.find({ answerId })
    .populate("teacherId", "name email")
    .sort({ createdAt: -1 });
    // Allow teacher/admin to view logs.
};
