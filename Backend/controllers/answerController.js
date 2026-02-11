const service = require("../services/answerService");
const Question = require("../models/Question");
const evaluationService = require("../services/evaluationService");
const Answer = require("../models/Answer");

exports.submitAnswer = async (req, res) => {
  try {
    const { examId, questionId, answerText } = req.body;

    // Get question concepts
    const question = await Question.findById(questionId);

    if (!question)
      return res.status(404).json({ message: "Question not found" });

    // Analyze coverage
    const analysis = evaluationService.analyzeConceptCoverage(
      answerText,
      question.concepts
    );

    const answer = await Answer.create({
      studentId: req.user.id,
      examId,
      questionId,
      answerText,
      ...analysis
    });

    res.status(201).json(answer);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};


exports.getMyAnswers = async (req, res) => {
  const answers = await service.getAnswersByExam(
    req.params.examId,
    req.user.id
  );

  res.json(answers);
};
