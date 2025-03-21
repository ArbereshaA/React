const express = require("express");
const {
  sendEmail,
  scheduleTour,
  sendListProperty,
  sendEmailWithFile,
  upload,
} = require("../controllers/EmailController");

const router = express.Router();

router.post("/send-email", sendEmail);
router.post("/scheduletoure", scheduleTour);
router.post("/send-listproperty", sendListProperty);
router.post(
  "/send-email-with-file",
  upload.array("file", 10),
  sendEmailWithFile
);

module.exports = router;
