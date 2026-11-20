const examService = require("../services/examService");

exports.createExam = async (req, res) => {
  try {
    const { title, subject, duration, totalMarks, deadline, questions } = req.body;

    if (!title || !subject) {
      return res.status(400).json({ message: "Title and subject are required" });
    }

    // 1. Create the exam container
    const exam = await examService.createExam({
      title,
      subject,
      duration: Number(duration) || 60,
      totalMarks: Number(totalMarks) || 100,
      deadline: deadline ? new Date(deadline) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      teacherId: req.user._id || req.user.id
    });

    // 2. If questions are provided, create them and link them
    if (questions && questions.length > 0) {
      const Question = require("../models/Question");
      const questionPromises = questions.map((q) => {
        return Question.create({
          examId: exam._id,
          text: q.text,
          totalMarks: Number(q.totalMarks) || 0,
          rubric: q.rubric || [],
          concepts: q.concepts || []
        });
      });

      const createdQuestions = await Promise.all(questionPromises);
      exam.questions = createdQuestions.map((q) => q._id);
      await exam.save();
    }

    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyExams = async (req, res) => {
  try {
    const teacherId = req.user._id || req.user.id;
    const exams = await examService.getTeacherExams(teacherId);
    res.json(exams);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.toggleExamStatus = async (req, res) => {
  try {
    const exam = await examService.getExamById(req.params.id);
    const userId = (req.user._id || req.user.id).toString();

    if (!exam || exam.teacherId.toString() !== userId) {
      return res.status(404).json({ message: "Exam not found or unauthorized" });
    }

    exam.status = exam.status === "active" ? "completed" : "active";
    await exam.save();

    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAvailableExams = async (req, res) => {
  try {
    const exams = await examService.getAllExams();
    const studentId = req.user._id || req.user.id;

    // Check which exams the student has already submitted
    const Answer = require("../models/Answer");
    const studentAnswers = await Answer.find({ studentId }).select("examId");
    const submittedExamIds = new Set(studentAnswers.map((ans) => ans.examId.toString()));

    const examsWithStatus = exams.map((exam) => ({
      ...exam.toObject(),
      isSubmitted: submittedExamIds.has(exam._id.toString())
    }));

    res.json(examsWithStatus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getExamById = async (req, res) => {
  try {
    const exam = await examService.getExamById(req.params.id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
