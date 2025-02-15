const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require("./routes/auth");
const apiRoutes = require("./routes/api");

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// Start server only if not in test mode
if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
// Export the app for testing
module.exports = app;