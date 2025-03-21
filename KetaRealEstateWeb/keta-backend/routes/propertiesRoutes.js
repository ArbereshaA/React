const express = require("express");
const router = express.Router();
const {
  authenticateJWT,
  authorizeAdmin,
} = require("../middlware/authMiddlware");
const propertyController = require("../controllers/propertiesController");
const upload = require("../middlware/uploadMiddleware"); // Import the multer upload middleware

router.post(
  "/upload",
  authenticateJWT,
  authorizeAdmin,
  upload.fields([
    { name: "photos", maxCount: 10 },
    { name: "floor_photos", maxCount: 10 },
  ]),
  propertyController.uploadPhotos
);

router.post(
  "/",
  authenticateJWT,
  authorizeAdmin,
  propertyController.createProperty
);

router.get("/", propertyController.getProperties);

router.get("/:id", propertyController.getPropertyById);

router.put(
  "/:id",
  authenticateJWT,
  authorizeAdmin,
  propertyController.updateProperty
);

// Delete a property by ID
router.delete(
  "/:id",
  authenticateJWT,
  authorizeAdmin,
  propertyController.deleteProperty
);

module.exports = router;
