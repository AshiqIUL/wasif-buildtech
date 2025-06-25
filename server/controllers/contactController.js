const nodemailer = require("nodemailer");
const Message = require("../models/Message");

const submitMessage = async (req, res) => {
    console.log("Incoming request body:", req.body);

  const { fullName, email, phone, message } = req.body;

  try {
    // Save to MongoDB
    const newMessage = new Message({
      name: fullName,
      email,
      phone,
      message,
    });
    console.log("📥 Saving message to MongoDB:", { fullName, email, phone, message });

    await newMessage.save();

    // Email setup using process.env
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: process.env.TO_EMAIL,
        replyTo: email, 
        subject: '📨 New Contact Form Submission - Wasif Buildtech',
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      };
      

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending error:", error);
        return res.status(500).json({ message: "Message saved, but email failed to send." });
      } else {
        console.log("Email sent:", info.response);
        return res.status(200).json({ message: "Message saved and email sent!" });
      }
    });
  } catch (error) {
    console.error("submitMessage error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { submitMessage };
