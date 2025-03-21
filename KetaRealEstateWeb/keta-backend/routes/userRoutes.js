const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);
  if (user && user.password === password) {
    return res.json({ message: "Login successful", user });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

module.exports = router;
