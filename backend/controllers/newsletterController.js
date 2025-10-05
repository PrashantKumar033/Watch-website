const Newsletter = require('../models/Newsletter');
const nodemailer = require('nodemailer');

// Subscribe to newsletter
const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res.status(400).json({ message: 'Email already subscribed' });
      } else {
        // Reactivate subscription
        existingSubscription.isActive = true;
        await existingSubscription.save();
        return res.json({ message: 'Subscription reactivated successfully' });
      }
    }

    // Create new subscription
    const subscription = new Newsletter({ email });
    await subscription.save();

    // Send welcome email (optional)
    try {
      await sendWelcomeEmail(email);
    } catch (emailError) {
      console.log('Email sending failed:', emailError.message);
    }

    res.status(201).json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Unsubscribe from newsletter
const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;
    
    const subscription = await Newsletter.findOne({ email });
    if (!subscription) {
      return res.status(404).json({ message: 'Email not found' });
    }

    subscription.isActive = false;
    await subscription.save();

    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subscribers (Admin only)
const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true })
      .sort({ subscribedAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send welcome email
const sendWelcomeEmail = async (email) => {
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Rolex Newsletter!',
    html: `
      <h2>Welcome to Rolex Newsletter!</h2>
      <p>Thank you for subscribing to our newsletter. You'll receive the latest updates about our watches, exclusive offers, and much more.</p>
      <p>Stay tuned for amazing deals!</p>
      <br>
      <p>Best regards,</p>
      <p>Rolex Team</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  subscribe,
  unsubscribe,
  getSubscribers
};