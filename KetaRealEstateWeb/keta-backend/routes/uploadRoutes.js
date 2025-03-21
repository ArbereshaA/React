const express = require("express");
const router = express.Router();
const upload = require("../middlware/uploadMiddleware");
const propertyController = require("../controllers/propertiesController");

router.post("/", upload.single("photo"), (req, res) => {
  // Return the filename to the frontend after uploading
  res.json({ filename: req.file.filename });
});

router.put(
  "/:id",
  upload.fields([{ name: "photos" }, { name: "floor_photos" }]), // Accept multiple files for each field
  propertyController.updateProperty
);

module.exports = router;
