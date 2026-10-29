import express from 'express';
import { registerUser, verifyOTP, resendOTP, loginUser, getMe } from '../controllers/authControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;
