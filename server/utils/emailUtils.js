const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.sendPaymentReceipt = async (email, amount, transactionId) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Payment Confirmation - Valuable Women",
    html: `
      <h2>Thank you for your donation!</h2>
      <p>We have received your donation of <strong>₦${amount}</strong>.</p>
      <p><strong>Transaction ID:</strong> ${transactionId}</p>
      <p>Your support helps us continue our mission. We truly appreciate it!</p>
      <p>Best regards, <br> Valuable Women Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
