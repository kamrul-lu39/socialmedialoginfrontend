const express = require("express");
const router = express.Router();
let data = []; // Mock database

// GET request (Working fine)
router.get("/", (req, res) => {
  res.json(data);
});

// POST request (Debugging issue)
router.post("/", (req, res) => {
  console.log("Incoming POST request to /api/");
  console.log("Request headers:", req.headers);
  console.log("Request body:", req.body); // Log the request body

  if (!req.body || !req.body.id || !req.body.name) {
    return res.status(400).json({ error: "Missing fields in request" });
  }

  const newItem = req.body;
  data.push(newItem);
  res.json(newItem);
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  data = data.map((item) => (item.id === id ? updatedItem : item));
  res.json(updatedItem);
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  data = data.filter((item) => item.id !== id);
  res.json({ message: "Item deleted" });
});

module.exports = router;
