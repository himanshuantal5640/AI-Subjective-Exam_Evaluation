const reviewService = require("../services/reviewService");
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const { evaluateWithAI } = require("../config/openRouter");

exports.evaluateAnswerWithAI = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answerId).populate("questionId");
    if (!answer) return res.status(404).json({ message: "Answer not found" });

    const question = answer.questionId;

    // Call the AI
    const aiResult = await evaluateWithAI(
      question.text,
      question.rubric,
      answer.answerText,
      question.totalMarks
    );

    const aiScore = Math.min(Math.max(aiResult.score, 0), question.totalMarks);

    // Update the answer document with AI results
    answer.aiSemanticScore = aiScore;
    answer.aiSemanticFeedback = aiResult.feedback;
    answer.aiConfidence = aiResult.confidence;

    // Recalculate hybrid final score
    const ruleFinalScore = answer.aiFinalScore || 0; // Keeping existing rule-based score
    const hybridFinalScore = Math.min(
      Math.round((ruleFinalScore * 0.4) + (aiScore * 0.6)),
      question.totalMarks
    );

    answer.hybridFinalScore = hybridFinalScore;

    // Only update teacherFinalScore if it hasn't been overridden yet
    if (!answer.isOverridden) {
      answer.teacherFinalScore = hybridFinalScore;
    }

    await answer.save();

    res.json(answer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getAnswersForReview = async (req, res) => {
  try {
    const answers =
      await reviewService.getAnswersByExam(
        req.params.examId
      );

    // Dynamically compute finalScore
    const formatted = answers.map(a => ({
      ...a.toObject(),
      finalScore: a.isOverridden
        ? a.teacherFinalScore
        : a.aiFinalScore
    }));

    res.json(formatted);

  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.overrideAnswerScore = async (req, res) => {
  try {
    const { teacherFinalScore, teacherComment } = req.body;

    const updated =
      await reviewService.overrideScore(
        req.params.answerId,
        req.user.id,
        teacherFinalScore,
        teacherComment
      );

    res.json(updated);

  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};


exports.getAuditLogs = async (req, res) => {
  try {
    const logs =
      await reviewService.getAuditLogsForAnswer(
        req.params.answerId
      );

    res.json(logs);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
