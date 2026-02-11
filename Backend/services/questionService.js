const Question = require("../models/Question");

exports.addQuestion = async (data) => {
  return await Question.create(data);
};

exports.getQuestionsByExam = async (examId) => {
  return await Question.find({ examId });
};
