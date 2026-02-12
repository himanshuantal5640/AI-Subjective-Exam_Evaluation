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
  marksAwarded: {
    type: Number,
    default: 0
  },
  teacherOverride: {
    type: Boolean,
    default: false
  },
  coverageScore: {
  type: Number,
  default: 0
  },
  coveredConcepts: [String],
  missingConcepts: [String],
  rubricScore: {
  type: Number,
  default: 0
},
qualityScore: {
  type: Number,
  default: 0
},
finalScore: {
  type: Number,
  default: 0
},
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
