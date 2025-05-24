const { sendInquiry } = require('../services/email.service');

const submitInquiry = async (req, res) => {
  const { name, email, phone, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "saksamgupta4@gmail.com",
    subject: `New Inquiry from ${name}`,
    html: `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333; margin-bottom: 20px;">New Inquiry Details</h2>
        <div style="margin-bottom: 15px;">
          <p style="margin: 8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 8px 0;"><strong>Phone:</strong> ${phone}</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 4px; margin-top: 20px;">
          <h3 style="color: #444; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6;">${message}</p>
        </div>
      </div>
    `
  };

  try {
    await sendInquiry(mailOptions);
    res.status(200).json({ message: "Inquiry sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ 
      message: "Error sending inquiry.", 
      error: err.message,
      details: err.code 
    });
  }
};

module.exports = {
  submitInquiry
};