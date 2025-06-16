const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Replace with your actual email & app password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sadhikapradeep62@gmail.com',
    pass: 'fjrkwbvsznxlgvao' // Use app-specific password
  }
});

app.post('/send-email', (req, res) => {
  const data = req.body;

  const mailOptions = {
    from: 'sadhikapradeep62@gmail.com',
    to: data.email, // Send to customer email
    subject: 'Order Confirmation - KZ KIT',
    text: `Thank you for your order!

Order Details:
Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.address}, ${data.city}, ${data.state} - ${data.pin}
Payment Method: ${data.payment}
Item: KZ KIT
Amount: ₹1,770.00
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Email error:', error);
      return res.status(500).send('Error sending email');
    }
    res.send('Email sent successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
