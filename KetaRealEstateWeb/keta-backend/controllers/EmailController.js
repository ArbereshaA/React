const nodemailer = require("nodemailer");
const multer = require("multer");

// Konfigurimi i Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ketarealestate@gmail.com",
    pass: "fric zrhs fggw tjjr",
  },
});

// Middleware për file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Funksioni për "/send-email"
const sendEmail = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: email,
      to: "ketarealestate@gmail.com",
      subject: `${name} - ${subject}`,
      text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}

      ------------------------------------------
      Please reach out to the sender as soon as possible.

      Best regards,
      Keta Real Estate Notification System
      `,
      replyTo: email,
    });
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    res.status(500).send("Error sending email: " + error.message);
  }
};

// Funksioni për "/scheduletoure"
const scheduleTour = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    await transporter.sendMail({
      from: email,
      to: "ketarealestate@gmail.com",
      subject: `${name} has scheduled a tour.`,
      text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}

      ------------------------------------------
      Please reach out to the sender as soon as possible.

      Best regards,
      Keta Real Estate Notification System
      `,
      replyTo: email,
    });
    res.status(200).send("Tour scheduled successfully!");
  } catch (error) {
    res.status(500).send("Error scheduling tour: " + error.message);
  }
};

// Funksioni për "/send-listproperty"
const sendListProperty = async (req, res) => {
  const { name, phone, email, address } = req.body;

  try {
    await transporter.sendMail({
      from: email,
      to: "ketarealestate@gmail.com",
      subject: `New property list request from ${name}`,
      text: `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Address: ${address}

      ------------------------------------------
      Please reach out to the sender as soon as possible.

      Best regards,
      Keta Real Estate Notification System
      `,
      replyTo: email,
    });
    res.status(200).send("Property list sent successfully!");
  } catch (error) {
    res.status(500).send("Error sending property list: " + error.message);
  }
};

// Funksioni për "/send-email-with-file"
const sendEmailWithFile = async (req, res) => {
  const { name, email, phone, propertyaddress, countrycity, message } =
    req.body;
  const attachments = req.files.map((file) => ({
    filename: file.originalname,
    content: file.buffer,
  }));

  try {
    await transporter.sendMail({
      from: email,
      to: "ketarealestate@gmail.com",
      subject: `${name} has sent files`,
      text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Property Address: ${propertyaddress}
      Country/City: ${countrycity}
      Message: ${message}

      ------------------------------------------
      Please reach out to the sender as soon as possible.

      Best regards,
      Keta Real Estate Notification System
      `,
      attachments,
      replyTo: email,
    });
    res.status(200).send("Email with files sent successfully!");
  } catch (error) {
    res.status(500).send("Error sending email with files: " + error.message);
  }
};

module.exports = {
  sendEmail,
  scheduleTour,
  sendListProperty,
  sendEmailWithFile,
  upload,
};
