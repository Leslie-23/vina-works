const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, unique: true },
  status: {
    type: String,
    enum: ["pending", "successful", "failed"],
    default: "pending",
  },
  paymentMethod: { type: String }, // e.g., "card", "bank_transfer"
  transactionFee: { type: Number }, // Fee charged by Paystack
  currency: { type: String, default: "NGN" }, // Default to Nigerian Naira
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
