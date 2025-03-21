const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key_12345"; // Ensure JWT_SECRET is an env variable in production

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByUsername(username); // Find user by username

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { user: { id: user.id, role: user.role } }, // Include user ID and role
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { login };
