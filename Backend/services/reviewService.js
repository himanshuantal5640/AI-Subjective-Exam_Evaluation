const Answer = require("../models/Answer");

exports.getAnswersByExam = async (examId) => {
  return await Answer.find({ examId })
    .populate("studentId", "name email")
    .populate("questionId", "text");
};

exports.overrideScore = async (
  answerId,
  teacherFinalScore,
  teacherComment
) => {
  const answer = await Answer.findById(answerId);
  if (!answer) throw new Error("Answer not found");

  answer.teacherFinalScore = teacherFinalScore;
  answer.teacherComment = teacherComment;
  answer.isOverridden = true;

  await answer.save();

  return answer;
};
