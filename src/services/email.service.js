const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
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