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

  aiFinalScore: {
    type: Number,
    required: true
  },

  previousTeacherScore: {
    type: Number
  },

  newTeacherScore: {
    type: Number,
    required: true
  },

  teacherComment: {
    type: String
  }

}, { timestamps: true });

module.exports = mongoose.model("AuditLog", auditLogSchema);
