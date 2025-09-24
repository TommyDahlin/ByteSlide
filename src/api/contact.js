// api/contact.js - Vercel serverless function with Nodemailer
// Place this file in your project's /api directory

const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Send email notification
    await sendEmailNotification({
      name,
      email,
      company,
      message
    });

    // Send auto-reply to the user
    await sendAutoReply({
      name,
      email
    });

    // Return success response
    return res.status(200).json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      error: 'Internal server error. Please try again later.' 
    });
  }
}

// Create transporter configuration
function createTransporter() {
  // For Gmail
  if (process.env.EMAIL_SERVICE === 'gmail') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App-specific password
      },
    });
  }
  
  // For Outlook
  if (process.env.EMAIL_SERVICE === 'outlook') {
    return nodemailer.createTransporter({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App-specific password
      },
    });
  }

  // For custom SMTP (like your own domain email)
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// Send notification email to you
async function sendEmailNotification({ name, email, company, message }) {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'TommyDahlin95@outlook.com',
    subject: `🚀 New ByteSlide Contact: ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="background: linear-gradient(to right, #2563eb, #9333ea); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          <p style="color: #bfdbfe; margin: 5px 0 0 0;">ByteSlide Landing Page</p>
        </div>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h2 style="color: #374151; margin-top: 0;">Contact Details</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;"><strong>Company:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">${company || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0;"><strong>Submitted:</strong></td>
              <td style="padding: 10px 0;">${new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })}</td>
            </tr>
          </table>
        </div>

        <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
          <h3 style="color: #374151; margin-top: 0;">Message</h3>
          <p style="color: #6b7280; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px; text-align: center;">
          <p style="margin: 0; color: #1e40af;">
            💡 <strong>Quick Reply:</strong> 
            <a href="mailto:${email}?subject=Re: Your ByteSlide Inquiry" style="color: #2563eb; text-decoration: none;">
              Click here to reply directly to ${name}
            </a>
          </p>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission - ByteSlide

Contact Details:
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Submitted: ${new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })}

Message:
${message}

Reply directly to: ${email}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully');
  } catch (error) {
    console.error('Nodemailer notification error:', error);
    throw error;
  }
}

// Send auto-reply to the person who submitted the form
async function sendAutoReply({ name, email }) {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for contacting ByteSlide! 🚀',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="background: linear-gradient(to right, #2563eb, #9333ea); padding: 30px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">ByteSlide</h1>
          <p style="color: #bfdbfe; margin: 10px 0 0 0; font-size: 16px;">Web Development Consulting</p>
        </div>
        
        <div style="padding: 0 10px;">
          <h2 style="color: #374151; margin-bottom: 20px;">Hi ${name}! 👋</h2>
          
          <p style="color: #6b7280; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out to ByteSlide! We've received your message and are excited to learn more about your project.
          </p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <p style="color: #1e40af; margin: 0; font-weight: 500;">
              ⚡ <strong>What happens next?</strong>
            </p>
            <ul style="color: #374151; margin: 10px 0 0 0; padding-left: 20px;">
              <li>We'll review your message within 2-4 hours</li>
              <li>Tommy will personally respond to discuss your needs</li>
              <li>We'll schedule a free consultation if it's a good fit</li>
            </ul>
          </div>

          <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Our Services</h3>
            <ul style="color: #6b7280; margin: 0; padding-left: 20px;">
              <li><strong>Single Page Applications</strong> - React, Vue, Angular</li>
              <li><strong>Full-Stack Web Applications</strong> - End-to-end solutions</li>
              <li><strong>Performance Optimization</strong> - Speed up existing apps</li>
              <li><strong>Technical Consulting</strong> - Architecture & best practices</li>
            </ul>
          </div>

          <p style="color: #6b7280; line-height: 1.6; margin: 20px 0;">
            In the meantime, feel free to check out our recent work or give us a call if you have any urgent questions.
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <div style="display: inline-block; background: linear-gradient(to right, #2563eb, #9333ea); padding: 15px 30px; border-radius: 8px;">
              <p style="color: white; margin: 0; font-weight: 600;">📞 +46709544189</p>
            </div>
          </div>

          <p style="color: #6b7280; line-height: 1.6;">
            Best regards,<br>
            <strong style="color: #374151;">Tommy Dahlin</strong><br>
            <span style="color: #9ca3af;">Founder, ByteSlide</span>
          </p>
        </div>

        <div style="margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0; color: #9ca3af; font-size: 14px;">
            This is an automated response. Please don't reply to this email.<br>
            For questions, contact us directly at TommyDahlin95@outlook.com
          </p>
        </div>
      </div>
    `,
    text: `
Hi ${name}!

Thank you for reaching out to ByteSlide! We've received your message and are excited to learn more about your project.

What happens next?
• We'll review your message within 2-4 hours
• Tommy will personally respond to discuss your needs  
• We'll schedule a free consultation if it's a good fit

Our Services:
• Single Page Applications - React, Vue, Angular
• Full-Stack Web Applications - End-to-end solutions
• Performance Optimization - Speed up existing apps
• Technical Consulting - Architecture & best practices

In the meantime, feel free to give us a call if you have any urgent questions.

Phone: +46709544189

Best regards,
Tommy Dahlin
Founder, ByteSlide

---
This is an automated response. For questions, contact us directly at TommyDahlin95@outlook.com
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Auto-reply email sent successfully');
  } catch (error) {
    console.error('Nodemailer auto-reply error:', error);
    // Don't throw error for auto-reply failure - main notification is more important
  }
}