const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "teacher", "admin"],
    required: true
  },

  isVerified: {
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: true
  },

  otp: String,
  otpExpiresAt: Date,
  otpAttempts: {
  type: Number,
  default: 0
},

otpResendCount: {
  type: Number,
  default: 0
},

otpLastSentAt: Date


}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
