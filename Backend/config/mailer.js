const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    to: email,
    subject: "OTP Verification",
    html: `<h2>Your OTP is ${otp}</h2><p>Valid for 10 minutes</p>`
  });
};

module.exports = sendOTPEmail;
