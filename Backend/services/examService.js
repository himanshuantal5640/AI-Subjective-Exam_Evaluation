const Exam = require("../models/Exam");

exports.createExam = async ({ title, subject, teacherId }) => {
  const exam = await Exam.create({
    title,
    subject,
    teacherId
  });
  return exam;
};

exports.getTeacherExams = async (teacherId) => {
  return await Exam.find({ teacherId });
};
