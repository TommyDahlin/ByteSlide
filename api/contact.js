import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, and message are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    await sendEmailNotification({ name, email, company, message });
    await sendAutoReply({ name, email });

    return res.status(200).json({ success: true, message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
}

function createTransport() {
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  if (process.env.EMAIL_SERVICE === 'outlook') {
    return nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function sendEmailNotification({ name, email, company, message }) {
  const transport = createTransport();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'TommyDahlin95@outlook.com',
    subject: `🚀 New ByteSlide Contact: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\n\n${message}`,
    html: `<h3>New contact from ${name}</h3>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Company:</strong> ${company || 'Not provided'}</p>
    <p><strong>Message:</strong> ${message}</p>`,
  };

  await transport.sendMail(mailOptions);
}

async function sendAutoReply({ name, email }) {
  const transport = createTransport();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for contacting ByteSlide!',
    text: `Hi ${name},\n\nThanks for reaching out! We'll review your message and get back to you shortly.\n\n- ByteSlide`,
    html: `<h3>Hi ${name} 👋</h3><p>Thanks for reaching out! We'll review your message and get back to you shortly.</p><p>- ByteSlide</p>`,
  };

  await transport.sendMail(mailOptions);
}
