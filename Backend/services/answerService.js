const Answer = require("../models/Answer");

exports.submitAnswer = async (data) => {
  return await Answer.create(data);
};

exports.getAnswersByExam = async (examId, studentId) => {
  return await Answer.find({ examId, studentId });
};
