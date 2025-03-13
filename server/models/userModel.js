const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Ms", "Dr", "Prof", "Engr", "Chief"],
      required: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    otp: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["visitor", "member", "admin", "superadmin"],
      default: "visitor",
    },
    occupation: { type: String, required: true },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
      required: true,
    },
    dateOfBirth: { type: Date, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    socialLinks: { type: Object, default: {} },
    isBanned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
