import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'tanmayyawalkar3@gmail.com';
const BREVO_SENDER_NAME = 'ResumeCraft Verification';

// Helper: Generate JWT token for user session
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'super_secret_jwt_key_resume_builder_2026',
    { expiresIn: '30d' }
  );
};

// Helper: Send Brevo OTP Email
async function sendOTPEmail(toEmail, userName, otp) {
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
        to: [{ email: toEmail, name: userName || 'User' }],
        subject: `Your ResumeCraft Verification Code: ${otp}`,
        htmlContent: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; padding: 40px 20px;">
            <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 32px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
              <div style="text-align: center; margin-bottom: 24px;">
                <h2 style="color: #4f46e5; margin: 0; font-size: 24px; font-weight: 700;">ResumeCraft</h2>
                <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Executive AI Resume Builder & ATS Studio</p>
              </div>
              <p style="color: #334155; font-size: 16px; line-height: 1.5; margin-bottom: 16px;">
                Hello <b>${userName || 'Professional'}</b>,
              </p>
              <p style="color: #475569; font-size: 15px; line-height: 1.5; margin-bottom: 24px;">
                Thank you for joining ResumeCraft. Please enter the following 6-digit verification code to complete your registration:
              </p>
              <div style="text-align: center; background-color: #f1f5f9; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <span style="font-size: 34px; font-weight: 700; letter-spacing: 10px; color: #4338ca;">${otp}</span>
              </div>
              <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin-bottom: 0; text-align: center;">
                This code expires in <b>10 minutes</b>. If you did not create a ResumeCraft account, you can safely disregard this email.
              </p>
            </div>
          </div>
        `,
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
