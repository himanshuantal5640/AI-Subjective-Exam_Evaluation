const examService = require("../services/examService");

exports.createExam = async (req, res) => {
  try {
    const { title, subject, duration, totalMarks, questions } = req.body;
    
    // 1. Create the exam container
    const exam = await examService.createExam({
      title,
      subject,
      duration,
      totalMarks,
      teacherId: req.user.id
    });

    // 2. If questions are provided, create them and link them
    if (questions && questions.length > 0) {
      const Question = require("../models/Question");
      const questionPromises = questions.map(q => {
        return Question.create({
          examId: exam._id,
          text: q.text,
          totalMarks: q.totalMarks || 0,
          rubric: q.rubric || [],
          concepts: q.concepts || []
        });
      });

      const createdQuestions = await Promise.all(questionPromises);
      exam.questions = createdQuestions.map(q => q._id);
      await exam.save();
    }

    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getMyExams = async (req, res) => {
  try {
    const exams = await examService.getTeacherExams(req.user.id);
    res.json(exams);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.toggleExamStatus = async (req, res) => {
  try {
    const exam = await examService.getExamById(req.params.id);
    if (!exam || exam.teacherId.toString() !== req.user.id) {
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
    
    // Check which exams the student has already submitted
    const Answer = require("../models/Answer");
    const studentAnswers = await Answer.find({ studentId: req.user.id }).select("examId");
    const submittedExamIds = new Set(studentAnswers.map(ans => ans.examId.toString()));

    const examsWithStatus = exams.map(exam => ({
      ...exam.toObject(),
      isSubmitted: submittedExamIds.has(exam._id.toString())
    }));

    res.json(examsWithStatus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// exports.getTeacherExams = async (req, res) => {
//   try {
//     const exams = await Exam.find({
//       createdBy: req.user._id   // or teacherId depending on your model
//     });

//     res.json(exams);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };