const request = require("supertest");
const app = require("./setup");
const User = require("../models/userModel");

let otpCode;
let authToken;

describe("🔑 Authentication Tests", () => {
  test("✅ Register User", async () => {
    const res = await request(app).post("/api/auth/register").send({
      title: "Mr",
      fullName: "John Doe",
      email: "john@example.com",
      password: "TestPass123!",
      occupation: "Software Engineer",
      maritalStatus: "Single",
      dateOfBirth: "1990-05-20",
      address: "123 Main St, Lagos",
      phone: "+2348012345678",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("OTP sent. Please verify your email.");

    const user = await User.findOne({ email: "john@example.com" });
    otpCode = user.otp;
  });

  test("✅ Verify OTP", async () => {
    const res = await request(app).post("/api/auth/verify-otp").send({
      email: "john@example.com",
      otp: otpCode,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Email verified successfully");
  });

  test("✅ Login User", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "john@example.com",
      password: "TestPass123!",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    authToken = res.body.token;
  });

  test("❌ Prevent Login for Unverified User", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "unverified@example.com",
      password: "TestPass123!",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid credentials or unverified email");
  });
});
