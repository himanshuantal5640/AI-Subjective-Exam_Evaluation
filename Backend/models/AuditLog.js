const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({

  answerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answer",
    required: true
  },

  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  aiFinalScore: Number,
  previousTeacherScore: Number,
  newTeacherScore: Number,
  teacherComment: String

}, { timestamps: true });

module.exports = mongoose.model("AuditLog", auditLogSchema);
