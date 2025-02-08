const admin = require("firebase-admin");

const login = async (req, res) => {
  const { token } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    res.json({ user: decodedToken });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { login };
