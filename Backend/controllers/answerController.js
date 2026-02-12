const service = require("../services/answerService");
const Question = require("../models/Question");
const evaluationService = require("../services/evaluationService");
const Answer = require("../models/Answer");

exports.submitAnswer = async (req, res) => {
  try {
    const { examId, questionId, answerText } = req.body;

    const question = await Question.findById(questionId);
    if (!question)
      return res.status(404).json({ message: "Question not found" });

    // Concept coverage
    const coverage =
      evaluationService.analyzeConceptCoverage(
        answerText,
        question.concepts
      );

    // Rubric scoring
    const rubricScore =
      evaluationService.calculateRubricScore(
        answerText,
        question.rubric
      );

    // Quality scoring
    const qualityScore =
      evaluationService.calculateQualityScore(answerText);

    // Weighted final score
    const finalScore =
      evaluationService.calculateFinalScore(
        rubricScore,
        coverage.coverageScore,
        qualityScore
      );

    // Confidence
    const confidenceLevel =
      evaluationService.calculateConfidence(
        coverage.coverageScore
      );

    // Feedback
    const feedback =
      evaluationService.generateFeedback(
        coverage.coveredConcepts,
        coverage.missingConcepts,
        qualityScore
      );

    const answer = await Answer.create({
      studentId: req.user.id,
      examId,
      questionId,
      answerText,
      ...coverage,
      rubricScore,
      qualityScore,
      finalScore,
      confidenceLevel,
      feedback
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
