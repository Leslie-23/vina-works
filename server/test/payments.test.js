describe("💳 Payment Tests", () => {
  let paymentRef;

  test("✅ Initialize Payment", async () => {
    const res = await request(app)
      .post("/api/payments/initialize")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ amount: 5000 });

    expect(res.statusCode).toBe(200);
    expect(res.body.authorization_url).toContain("paystack");
    paymentRef = res.body.authorization_url.split("/").pop();
  });

  test("✅ Verify Payment", async () => {
    const res = await request(app)
      .get(`/api/payments/verify/${paymentRef}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Payment successful");
  });
});
