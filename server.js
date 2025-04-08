const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const cors = require("cors");
app.use(cors());


dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up file upload
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.post('/send', upload.single('resume'), async (req, res) => {
  const { name, yoe } = req.body;
  const resumePath = req.file.path;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'saksamgupta4@gmail.com', // You receiving it
    subject: 'New Resume Submission',
    text: `Name: ${name}\nExperience: ${yoe} years`,
    attachments: [{
      filename: req.file.originalname,
      path: resumePath,
    }],
  };

  try {
    await transporter.sendMail(mailOptions);
    fs.unlinkSync(resumePath); // delete file after sending
    res.send('Email sent successfully!');
  } catch (err) {
    res.status(500).send('Error sending email: ' + err.message);
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running`);
});
