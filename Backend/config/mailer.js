const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendOTPEmail = async (email, otp) => {

  await transporter.sendMail({
    from: `"AI Evaluation System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Account Verification</h2>
        <p>Your OTP is:</p>
        <h1 style="color: #4CAF50;">${otp}</h1>
        <p>This OTP expires in 10 minutes.</p>
        <hr/>
        <p>If you did not request this, ignore this email.</p>
      </div>
    `
  });
};
