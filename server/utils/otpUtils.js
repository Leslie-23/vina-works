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
    html: `
    <h2>Thank you for your joining!</h2>
    <p><strong>OTP: ${otp} </strong></p>
    <p>Please enter this OTP code to verify your email address.</p><br/><br/>
    <p>This OTP is valid for 5 minutes. If you didn't request this verification, please ignore this email.</p>
    <p>If you have any questions, please contact our support team at <a href="mailto:support@valuablewomen.com">support@valuablewomen.com</a>.</p>
    <p>Thank you for your trust in us.</p>

    <p>Best regards, <br> Valuable Women Team</p>
  `,
  });
};
