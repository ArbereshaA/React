const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const postController = require("../controllers/postcontrollers");
const {
  authenticateJWT,
  authorizeAdmin,
} = require("../middlware/authMiddlware");

// Create a new post (Protected by JWT and Admin Role)
router.post("/", authenticateJWT, authorizeAdmin, postController.createPost);

// Get all posts (Public Route)
router.get("/", postController.getPosts);

// Get a post by ID (Public Route)
router.get("/:id", postController.getPostById);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "bloguploads/"); // Ensure this directory exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to file name
  },
});

const upload = multer({ storage });

// Update a post by ID (Protected by JWT and Admin Role)
router.put(
  "/:id",
  authenticateJWT,
  authorizeAdmin,
  upload.single("photo"),
  postController.updatePost
);

// Delete a post by ID (Protected by JWT and Admin Role)
router.delete(
  "/:id",
  authenticateJWT,
  authorizeAdmin,
  postController.deletePost
);

module.exports = router;
