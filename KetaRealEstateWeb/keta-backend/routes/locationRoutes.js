const express = require("express");
const router = express.Router();
const {
  authenticateJWT,
  authorizeAdmin,
} = require("../middlware/authMiddlware");
const locationController = require("../controllers/locationController");

// Create a new location (Admin only)
router.post(
  "/",
  authenticateJWT,
  authorizeAdmin,
  locationController.createLocation
);

// Get all locations (Public)
router.get("/", locationController.getLocations);

// Get a single location by ID (Public)
router.get("/:id", locationController.getLocationById);

// Update a location by ID (Admin only)
router.put(
  "/:id",
  authenticateJWT,
  authorizeAdmin,
  locationController.updateLocation
);

// Delete a location by ID (Admin only)
router.delete(
  "/:id",
  authenticateJWT,
  authorizeAdmin,
  locationController.deleteLocation
);

module.exports = router;
