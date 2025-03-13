const axios = require("axios");
const Payment = require("../models/paymentModel");
const { sendPaymentReceipt } = require("../utils/emailUtils");

exports.initializePayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const user = req.user;

    // Convert amount to kobo (Paystack uses smallest currency unit)
    const paystackAmount = amount * 100;

    // Create a transaction reference
    const transactionRef = `txn_${Date.now()}`;

    // Send request to Paystack
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: user.email,
        amount: paystackAmount,
        reference: transactionRef,
        callback_url: process.env.PAYSTACK_CALLBACK_URL,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Save payment record
    await Payment.create({
      user: user._id,
      amount,
      transactionId: transactionRef,
      status: "pending",
    });

    res.json({ authorization_url: response.data.data.authorization_url });
  } catch (error) {
    res.status(500).json({ message: "Payment initialization failed" });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    );

    const payment = await Payment.findOne({ transactionId: reference });
    if (!payment)
      return res.status(404).json({ message: "Transaction not found" });

    if (response.data.data.status === "success") {
      payment.status = "successful";
      payment.paymentMethod = response.data.data.channel;
      payment.transactionFee = response.data.data.fees;
      payment.currency = response.data.data.currency;
      await payment.save();

      // Send Confirmation Email
      await sendPaymentReceipt(payment.user.email, payment.amount, reference);

      return res.json({ message: "Payment successful", payment });
    } else {
      payment.status = "failed";
      await payment.save();
      return res.status(400).json({ message: "Payment failed" });
    }
  } catch (error) {
    res.status(500).json({ message: "Payment verification failed" });
  }
};
exports.handleWebhook = async (req, res) => {
  try {
    const event = req.body;

    if (event.event === "charge.success") {
      const { reference, amount, customer, channel, fees, currency } =
        event.data;

      const payment = await Payment.findOne({ transactionId: reference });
      if (!payment)
        return res.status(404).json({ message: "Payment record not found" });

      // Update payment details
      payment.status = "successful";
      payment.paymentMethod = channel;
      payment.transactionFee = fees;
      payment.currency = currency;
      await payment.save();

      // Send confirmation email
      await sendPaymentReceipt(customer.email, amount / 100, reference);

      console.log(
        `✅ Payment successful: ${reference}, Email sent to ${customer.email}`
      );
    }

    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: "Webhook processing failed" });
  }
};
