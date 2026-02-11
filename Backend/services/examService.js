
const Exam = require("../models/Exam");

exports.createExam = async (data) => {
  return await Exam.create(data);
};

exports.getTeacherExams = async (teacherId) => {
  return await Exam.find({ teacherId });
};
