const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const { error } = require("console");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up file upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

app.post("/submit-form", upload.single("resume"), async (req, res) => {
  const {
    name,
    email,
    phone,
    experience,
    location,
    skills,
    currentSalary,
    expectedSalary,
    jobTitle,
  } = req.body;
  const resumePath = req.file?.path;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "saksamgupta4@gmail.com", // You receiving it
    subject: `New Application for ${jobTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">New Job Application</h2>
        <p><strong>Job Title:</strong> ${jobTitle}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Skills:</strong> ${skills}</p>
        <p><strong>Experience:</strong> ${experience} years</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Current Salary:</strong> ${currentSalary}</p>
        <p><strong>Expected Salary:</strong> ${expectedSalary}</p>
      </div>
    `,
    attachments: req.file
      ? [
          {
            filename: req.file.originalname,
            path: resumePath,
          },
        ]
      : [],
  };

  try {
    await transporter.sendMail(mailOptions);
    if (resumePath) fs.unlinkSync(resumePath); // delete file after sending
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res
      .status(500)
      .send({ message: "Error sending email.", error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
