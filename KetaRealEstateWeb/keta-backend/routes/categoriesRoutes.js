const express = require("express");
const router = express.Router();
const {
  authenticateJWT,
  authorizeAdmin,
} = require("../middlware/authMiddlware");
const categoryController = require("../controllers/categoryController");

// Create a new category (Admin only)
router.post(
  "/",
  authenticateJWT,
  authorizeAdmin,
  categoryController.createCategory
);

// Get all categories (Public)
router.get("/", categoryController.getCategories);

// Get a single category by ID (Public)
router.get("/:id", categoryController.getCategoryById);

// Update a category by ID (Admin only)
router.put(
  "/:id",
  authenticateJWT,
  authorizeAdmin,
  categoryController.updateCategory
);

// Delete a category by ID (Admin only)
router.delete(
  "/:id",
  authenticateJWT,
  authorizeAdmin,
  categoryController.deleteCategory
);

module.exports = router;
