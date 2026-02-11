const mongoose = require("mongoose");

const rubricSchema = new mongoose.Schema({
  concept: String,
  marks: Number
});

const conceptSchema = new mongoose.Schema({
  name: String,
  dependsOn: [String]
});

const questionSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam"
  },
  text: String,
  totalMarks: Number,
  rubric: [rubricSchema],
  concepts: [conceptSchema]
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);
