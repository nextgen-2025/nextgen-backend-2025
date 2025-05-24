const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendJobApplication = async (mailOptions) => {
  return await transporter.sendMail(mailOptions);
};

const sendInquiry = async (mailOptions) => {
  return await transporter.sendMail(mailOptions);
};

module.exports = {
  sendJobApplication,
  sendInquiry
};