let data = []; // Mock database

const getData = (req, res) => res.json(data);
const createData = (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.json(newItem);
};
const updateData = (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  data = data.map((item) => (item.id === id ? updatedItem : item));
  res.json(updatedItem);
};
const deleteData = (req, res) => {
  const { id } = req.params;
  data = data.filter((item) => item.id !== id);
  res.json({ message: "Item deleted" });
};

module.exports = { getData, createData, updateData, deleteData };
