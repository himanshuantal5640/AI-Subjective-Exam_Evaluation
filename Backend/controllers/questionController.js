const service = require("../services/questionService");

exports.addQuestion = async (req, res) => {
  try {
    const q = await service.addQuestion(req.body);
    res.status(201).json(q);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.getQuestions = async (req, res) => {
  const qs = await service.getQuestionsByExam(req.params.examId);
  res.json(qs);
};
