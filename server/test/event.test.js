const request = require("supertest");
const app = require("./setup");
const User = require("../models/userModel");

let authTokenMember;
let authTokenAdmin;
let eventId;

describe("📅 Event Management Tests", () => {
  // ✅ Setup: Register and Login Users (Admin & Member)
  beforeAll(async () => {
    // Create an Admin User
    await request(app).post("/api/auth/register").send({
      title: "Dr",
      fullName: "Admin User",
      email: "admin@example.com",
      password: "AdminPass123",
      occupation: "Event Manager",
      maritalStatus: "Married",
      dateOfBirth: "1985-03-10",
      address: "123 Admin St, Abuja",
      phone: "+2347012345678",
    });

    await request(app).post("/api/auth/verify-otp").send({
      email: "admin@example.com",
      otp: "123456", // Mock OTP
    });

    const adminLogin = await request(app).post("/api/auth/login").send({
      email: "admin@example.com",
      password: "AdminPass123",
    });

    authTokenAdmin = adminLogin.body.token;

    // Create a Member User
    await request(app).post("/api/auth/register").send({
      title: "Mr",
      fullName: "Member User",
      email: "member@example.com",
      password: "MemberPass123",
      occupation: "Software Engineer",
      maritalStatus: "Single",
      dateOfBirth: "1992-08-25",
      address: "456 Member St, Lagos",
      phone: "+2348098765432",
    });

    await request(app).post("/api/auth/verify-otp").send({
      email: "member@example.com",
      otp: "123456", // Mock OTP
    });

    const memberLogin = await request(app).post("/api/auth/login").send({
      email: "member@example.com",
      password: "MemberPass123",
    });

    authTokenMember = memberLogin.body.token;
  });

  // ✅ Test 1: Admin Creates an Event
  test("✅ Admin can create an event", async () => {
    const res = await request(app)
      .post("/api/events")
      .set("Authorization", `Bearer ${authTokenAdmin}`)
      .send({
        title: "Tech Leadership Summit",
        description: "A summit for aspiring women tech leaders.",
        date: "2025-09-15",
        location: "Lagos, Nigeria",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Tech Leadership Summit");
    eventId = res.body._id; // Store event ID for future tests
  });

  // ✅ Test 2: Fetch All Events (Public Access)
  test("✅ Anyone can fetch all events", async () => {
    const res = await request(app).get("/api/events");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // ✅ Test 3: Member Registers for an Event
  test("✅ Member can register for an event", async () => {
    const res = await request(app)
      .post(`/api/events/register/${eventId}`)
      .set("Authorization", `Bearer ${authTokenMember}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Registered for event");
  });

  // ✅ Test 4: Prevent Duplicate Event Registrations
  test("❌ Prevent duplicate registrations", async () => {
    const res = await request(app)
      .post(`/api/events/register/${eventId}`)
      .set("Authorization", `Bearer ${authTokenMember}`);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Already registered");
  });

  // ✅ Test 5: Fetch Specific Event (Should Show Registered Attendees)
  test("✅ Fetch event details with registered attendees", async () => {
    const res = await request(app).get(`/api/events/${eventId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.attendees.length).toBe(1); // Member is registered
  });

  // ✅ Test 6: Admin Deletes Event
  test("✅ Admin can delete an event", async () => {
    const res = await request(app)
      .delete(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${authTokenAdmin}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Event deleted");
  });

  // ✅ Test 7: Member Cannot Delete Event
  test("❌ Member cannot delete an event", async () => {
    const res = await request(app)
      .delete(`/api/events/${eventId}`)
      .set("Authorization", `Bearer ${authTokenMember}`);

    expect(res.statusCode).toBe(403); // Forbidden
    expect(res.body.message).toBe("Forbidden: Admins only");
  });
});
