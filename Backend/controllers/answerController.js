const service = require("../services/answerService");

exports.submitAnswer = async (req, res) => {
  try {
    const answer = await service.submitAnswer({
      ...req.body,
      studentId: req.user.id
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
