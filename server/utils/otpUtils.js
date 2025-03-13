const nodemailer = require("nodemailer");

exports.generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

exports.sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your verification OTP Code for Valuable Women",
    text: `Your OTP code is ${otp}`,
  });
};
