const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { sendOTPEmail, generateOTP } = require("../utils/otpUtils");

exports.register = async (req, res) => {
  const {
    title,
    firstName,
    lastName,
    email,
    password,
    occupation,
    maritalStatus,
    dateOfBirth,
    address,
    phone,
  } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Validate age
    const dob = new Date(dateOfBirth);
    const today = new Date();
    const minAgeDate = new Date(today.setFullYear(today.getFullYear() - 18));
    if (dob > minAgeDate)
      return res
        .status(400)
        .json({ message: "User must be at least 18 years old." });

    // Validate phone format
    if (!/^\+\d{10,15}$/.test(phone)) {
      return res.status(400).json({
        message: "Phone number must start with '+' and contain 10-15 digits.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP for email verification
    const otp = generateOTP();

    // Create new user
    const user = await User.create({
      title,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      otp,
      occupation,
      maritalStatus,
      dateOfBirth,
      address,
      phone,
    });

    // Send OTP email
    await sendOTPEmail(email, otp);

    res
      .status(201)
      .json({ message: "OTP sent. Please verify your email.", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error", stack: error.stack, error: error });
    console.error(error);
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    if (!user.isVerified)
      return res.status(400).json({ message: "Email is not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({
      token,
      user: {
        id: user._id,
        title: user.title,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        occupation: user.occupation,
        maritalStatus: user.maritalStatus,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
        phone: user.phone,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        socialLinks: user.socialLinks,
        isBanned: user.isBanned,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", stack: error.stack });
  }
};
