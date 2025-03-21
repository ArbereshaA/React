const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const propertyRoutes = require("./routes/propertiesRoutes");
const categoryRoutes = require("./routes/categoriesRoutes");
const locationRoutes = require("./routes/locationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");
const emailRoutes = require("./routes/emailRoutes");

const { login } = require("./controllers/auth");
const {
  authenticateJWT,
  authorizeAdmin,
} = require("./middlware/authMiddlware");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true })); // Add this to handle URL-encoded data
// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Make uploaded images publicly accessible
app.use("/bloguploads", express.static(path.join(__dirname, "bloguploads")));

app.use("/api", emailRoutes);
app.post("/login", login);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/categories", categoryRoutes); // Add categories routes
app.use("/api/locations", locationRoutes); // Add locations routes
app.use("/api/upload", uploadRoutes);
// Protect the /admin route
app.get("/admin", authenticateJWT, authorizeAdmin, (req, res) => {
  res.send("This is the admin panel");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
