describe("📝 Blog Management Tests", () => {
  let blogId;

  test("✅ Create Blog", async () => {
    const res = await request(app)
      .post("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Empowering Women in Tech",
        content: "Women are making waves in the tech industry...",
        image: "https://example.com/blog.jpg",
      });

    expect(res.statusCode).toBe(201);
    blogId = res.body.id;
  });

  test("✅ Fetch All Blogs", async () => {
    const res = await request(app).get("/api/blogs");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test("✅ Delete Blog", async () => {
    const res = await request(app)
      .delete(`/api/blogs/${blogId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Blog deleted");
  });
});
