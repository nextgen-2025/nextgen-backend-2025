const fs = require('fs');
const { sendJobApplication } = require('../services/email.service');

const submitJobApplication = async (req, res) => {
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

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "hr1@nextgeninfratech.in",
    subject: `New Application for ${jobTitle}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color:rgb(48, 167, 175); padding: 20px; border-radius: 5px;">
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
    await sendJobApplication(mailOptions);
    if (resumePath) fs.unlinkSync(resumePath);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ 
      message: "Error sending email.", 
      error: err.message 
    });
  }
};

module.exports = {
  submitJobApplication
};