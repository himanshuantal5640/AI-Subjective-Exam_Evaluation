const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true
  },

  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true
  },

  answerText: {
    type: String,
    required: true
  },

  // 🔹 Phase 2 Evaluation Fields
  coveredConcepts: [String],

  missingConcepts: [String],

  coverageScore: {
    type: Number,
    default: 0
  },

  rubricScore: {
    type: Number,
    default: 0
  },

  qualityScore: {
    type: Number,
    default: 0
  },

  // 🔹 Phase 3 Human-in-the-Loop Fields
  aiFinalScore: {
    type: Number,
    default: 0
  },

  teacherFinalScore: {
    type: Number,
    default: 0
  },

  isOverridden: {
    type: Boolean,
    default: false
  },

  teacherComment: {
    type: String
  },

  // 🔹 Transparency Fields
  confidenceLevel: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low"
  },

  feedback: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("Answer", answerSchema);
