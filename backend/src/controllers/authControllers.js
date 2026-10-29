import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'resumecraftstudio3@gmail.com';
const BREVO_SENDER_NAME = 'ResumeCraft Verification';

// Helper: Generate JWT token for user session
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'super_secret_jwt_key_resume_builder_2026',
    { expiresIn: '30d' }
  );
};

// Helper: Send Brevo OTP Email with Executive Design & Logo
async function sendOTPEmail(toEmail, userName, otp) {
  try {
    const logoUrl = 'https://resume-craft-eight-chi.vercel.app/logo.png';
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your ResumeCraft Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 520px; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08);">
          
          <!-- Top Gradient Accent Bar -->
          <tr>
            <td style="height: 6px; background: linear-gradient(90deg, #6366f1, #a855f7, #ec4899);"></td>
          </tr>

          <!-- Brand Logo & Header -->
          <tr>
            <td style="padding: 36px 36px 20px 36px; text-align: center;">
              <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td align="center" style="width: 68px; height: 68px; border-radius: 18px; background: #ffffff; border: 1px solid #e0e7ff; box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15); padding: 6px;">
                    <img src="${logoUrl}" alt="ResumeCraft" width="56" height="56" style="display: block; border-radius: 14px; object-fit: contain;" />
                  </td>
                </tr>
              </table>
              <h1 style="margin: 16px 0 4px 0; color: #0f172a; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">ResumeCraft</h1>
              <p style="margin: 0; color: #64748b; font-size: 13px; font-weight: 500;">Executive AI Resume Builder &amp; ATS Studio</p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 0 36px 28px 36px;">
              <p style="margin: 0 0 14px 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                Hello ${userName || 'Professional'},
              </p>
              <p style="margin: 0 0 24px 0; color: #475569; font-size: 14px; line-height: 1.6;">
                Welcome to <b>ResumeCraft</b>. You're just one step away from building recruiter-ready, ATS-optimized resumes. Please enter the verification code below to activate your account:
              </p>

              <!-- OTP Code Display Card -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, #f8faff 0%, #eef2ff 100%); border-radius: 16px; border: 1.5px dashed #c7d2fe; padding: 24px 16px; text-align: center;">
                <tr>
                  <td align="center">
                    <div style="color: #6366f1; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px;">One-Time Verification Code</div>
                    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 38px; font-weight: 800; letter-spacing: 12px; color: #3730a3; padding: 4px 0 8px 12px;">
                      ${otp}
                    </div>
                    <div style="display: inline-block; background-color: #ffffff; border: 1px solid #e0e7ff; border-radius: 20px; padding: 4px 14px; color: #64748b; font-size: 12px; font-weight: 500;">
                      ⏱️ Valid for <b>10 minutes</b>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Security Tip -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 24px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #f1f5f9; padding: 12px 14px;">
                <tr>
                  <td style="color: #64748b; font-size: 12px; line-height: 1.5;">
                    🔒 <b>Security Tip:</b> Never share this code with anyone. ResumeCraft support will never ask for your verification code.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #f1f5f9; padding: 24px 36px; text-align: center;">
              <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px;">
                Sent from <b>ResumeCraft Studio</b>
              </p>
              <p style="margin: 0; color: #cbd5e1; font-size: 11px;">
                <a href="https://resume-craft-eight-chi.vercel.app" style="color: #6366f1; text-decoration: none; font-weight: 600;">Visit ResumeCraft</a> &bull; ATS Compliance Engine &bull; Lossless PDF Studio
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
        to: [{ email: toEmail, name: userName || 'User' }],
        subject: 'Verify your ResumeCraft account',
        htmlContent: html,
      }),
    });

    return res.ok;
  } catch (e) {
    console.error('Failed to send OTP email via Brevo:', e.message);
    return false;
  }
}

// @desc    Register a new user & trigger OTP email
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: cleanEmail });

    if (existing && existing.isVerified) {
      return res.status(400).json({ message: 'A user with this email already exists. Please sign in.' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    let user;
    if (existing && !existing.isVerified) {
      existing.name = name.trim();
      existing.password = password;
      existing.otp = otp;
      existing.otpExpires = otpExpires;
      user = await existing.save();
    } else {
      user = await User.create({
        name: name.trim(),
        email: cleanEmail,
        password,
        isVerified: false,
        otp,
        otpExpires,
      });
    }

    await sendOTPEmail(cleanEmail, user.name, otp);

    res.status(200).json({
      requireOtp: true,
      email: cleanEmail,
      message: 'A 6-digit verification code has been sent to your email address.',
    });
  } catch (error) {
    console.error('Registration Error:', error.message);
    res.status(500).json({ message: error.message || 'Server registration error' });
  }
};

// @desc    Verify OTP and activate user account
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and verification code are required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = String(otp).trim();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({ message: 'User account not found' });
    }

    if (user.isVerified) {
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        message: 'Account is already verified.',
      });
    }

    if (!user.otp || user.otp !== cleanOtp) {
      return res.status(400).json({ message: 'Invalid verification code. Please check your email.' });
    }

    if (user.otpExpires && new Date() > user.otpExpires) {
      return res.status(400).json({ message: 'Verification code has expired. Please click Resend Code.' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: 'Email successfully verified!',
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server verification error' });
  }
};

// @desc    Resend OTP verification code
// @route   POST /api/auth/resend-otp
// @access  Public
export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Please provide your email address' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({ message: 'No account found with this email' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'Account is already verified. Please sign in.' });
    }

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = newOtp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const sent = await sendOTPEmail(cleanEmail, user.name, newOtp);
    if (!sent) {
      return res.status(500).json({ message: 'Failed to send verification email. Please try again.' });
    }

    res.json({ message: 'A new 6-digit verification code has been sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error resending code' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      const freshOtp = Math.floor(100000 + Math.random() * 900000).toString();
      user.otp = freshOtp;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();
      await sendOTPEmail(cleanEmail, user.name, freshOtp);

      return res.status(403).json({
        requireOtp: true,
        email: cleanEmail,
        message: 'Your email is not verified yet. A fresh verification code has been sent to your inbox.',
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({ message: error.message || 'Server login error' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
