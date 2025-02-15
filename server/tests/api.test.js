const request = require("supertest");
const app = require("../server"); // Import Express app

describe("API Endpoints", () => {
  
  // ✅ Happy Path Tests (10 Cases)
  
  it("✅ GET /api/ should return an empty array initially", async () => {
    const res = await request(app).get("/api/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it("✅ POST /api/ should create a new item", async () => {
    const newItem = { id: "1", name: "Test Item" };
    const res = await request(app).post("/api/").send(newItem);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(newItem);
  });

  it("✅ GET /api/ should return the created item", async () => {
    const res = await request(app).get("/api/");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Test Item");
  });

  it("✅ PUT /api/:id should update an existing item", async () => {
    const updatedItem = { id: "1", name: "Updated Item" };
    const res = await request(app).put("/api/1").send(updatedItem);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(updatedItem);
  });

  it("✅ DELETE /api/:id should delete an existing item", async () => {
    const res = await request(app).delete("/api/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Item deleted");
  });

  it("✅ GET /api/ should return an empty array after deletion", async () => {
    const res = await request(app).get("/api/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it("✅ POST multiple items and check response", async () => {
    await request(app).post("/api/").send({ id: "2", name: "Item 1" });
    await request(app).post("/api/").send({ id: "3", name: "Item 2" });
    const res = await request(app).get("/api/");
    expect(res.body.length).toBe(2);
  });

  it("✅ DELETE all items and confirm", async () => {
    await request(app).delete("/api/2");
    await request(app).delete("/api/3");
    const res = await request(app).get("/api/");
    expect(res.body.length).toBe(0);
  });

  it("✅ POST /api/ should allow unique IDs", async () => {
    const res = await request(app).post("/api/").send({ id: "unique", name: "Unique Item" });
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe("Unique Item");
  });

  it("✅ GET /api/ should return correct number of items", async () => {
    const res = await request(app).get("/api/");
    expect(res.body.length).toBe(1);
  });

  // ❌ Error Handling Tests (5 Cases)

  it("❌ POST /api/ should return 400 if no data is provided", async () => {
    const res = await request(app).post("/api/").send({});
    expect(res.statusCode).toEqual(400);
  });

  it("❌ PUT /api/:id should return 404 if ID does not exist", async () => {
    const res = await request(app).put("/api/999").send({ name: "Non-existent" });
    expect(res.statusCode).toEqual(404);
  });

  it("❌ DELETE /api/:id should return 404 if ID does not exist", async () => {
    const res = await request(app).delete("/api/999");
    expect(res.statusCode).toEqual(404);
  });

  it("❌ GET /unknown should return 404", async () => {
    const res = await request(app).get("/unknown");
    expect(res.statusCode).toEqual(404);
  });

  it("❌ POST /api/ should not allow duplicate IDs", async () => {
    await request(app).post("/api/").send({ id: "duplicate", name: "Item 1" });
    const res = await request(app).post("/api/").send({ id: "duplicate", name: "Item 2" });
    expect(res.statusCode).toEqual(400);
  });

  // ⚠️ Edge Case Tests (5 Cases)

  it("⚠️ POST /api/ should handle long names", async () => {
    const longName = "A".repeat(1001);
    const res = await request(app).post("/api/").send({ id: "longname", name: longName });
    expect(res.statusCode).toBe(400); // Assuming max length is 1000
  });

  it("⚠️ POST /api/ should allow special characters in names", async () => {
    const res = await request(app).post("/api/").send({ id: "special", name: "@!#%&*()" });
    expect(res.statusCode).toEqual(200);
  });

  it("⚠️ GET /api/ should handle large datasets", async () => {
    for (let i = 0; i < 100; i++) {
      await request(app).post("/api/").send({ id: `item${i}`, name: `Item ${i}` });
    }
    const res = await request(app).get("/api/");
    expect(res.body.length).toBe(101);
  });

  it("⚠️ PUT /api/:id should handle updating to empty names", async () => {
    const res = await request(app).put("/api/special").send({ id: "special", name: "" });
    expect(res.statusCode).toBe(400);
  });

  it("⚠️ DELETE /api/:id should return correct response when item is already deleted", async () => {
    await request(app).delete("/api/special");
    const res = await request(app).delete("/api/special");
    expect(res.statusCode).toBe(404);
  });

});
