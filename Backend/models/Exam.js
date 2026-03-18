const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  duration: {
    type: Number,
    required: true,
    default: 60
  },
  totalMarks: {
    type: Number,
    required: true,
    default: 100
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    }
  ],
  status: {
    type: String,
    enum: ["active", "completed"],
    default: "active"
  }
}, { timestamps: true });

module.exports = mongoose.model("Exam", examSchema);
