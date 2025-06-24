const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT =process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sadhikapradeep62@gmail.com',
    pass: 'fjrkwbvsznxlgvao' // Use app-specific password
  }
});

app.post('/send-email', (req, res) => {
  const data = req.body;

  // Debug log to check data received
  console.log('Received data:', data);

  const mailOptions = {
    from: data.email,
    to: 'sadhikapradeep62@gmail.com', // Customer's email
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

We’ll process your order shortly. If you have any questions, feel free to contact us.

Best regards,  
KZ KIT Team`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).send('Error sending email');
    }
    console.log('Email sent:', info.response);
    res.send('Email sent successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
