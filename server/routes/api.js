const express = require("express");
const router = express.Router();
let data = []; // Temporary mock database

router.get("/", (req, res) => res.json(data));
router.post("/", (req, res) => {
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
