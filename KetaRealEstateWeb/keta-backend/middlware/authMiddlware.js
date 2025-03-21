const jwt = require("jsonwebtoken");

const JWT_SECRET = "my_super_secret_key_12345"; // Same JWT secret

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer <token>"
  //console.log("token", token);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user.user; // Attach user data to req object
    next();
  });
};

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Admins only: Access forbidden" });
  }
};

module.exports = { authenticateJWT, authorizeAdmin };
