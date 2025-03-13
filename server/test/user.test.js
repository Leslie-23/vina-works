describe("👤 User Management Tests", () => {
  test("✅ Get User Profile", async () => {
    const res = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.fullName).toBe("John Doe");
  });

  test("✅ Update Profile", async () => {
    const res = await request(app)
      .put("/api/users/update")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        occupation: "Senior Developer",
        address: "456 New St, Abuja",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Profile updated successfully");
  });

  test("❌ Prevent Email Change", async () => {
    const res = await request(app)
      .put("/api/users/update")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ email: "newemail@example.com" });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email cannot be changed.");
  });
});
