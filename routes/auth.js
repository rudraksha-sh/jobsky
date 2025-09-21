const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// --- Nodemailer Setup ---
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// --- Helper Function to Generate JWT ---
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// @route   POST /api/send-verification-otp
// @desc    Send a verification OTP to the user's email
// @access  Public
router.post('/send-verification-otp', async (req, res) => {
    const { email } = req.body;
    try {
        // 1. Check if user is already fully registered
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser.password) {
            return res.status(400).json({ msg: 'An account with this email already exists.' });
        }

        // 2. Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

        // 3. Save OTP to a temporary user record (or update existing one)
        // Using upsert to create a doc if it doesn't exist, useful if user tries again
        await User.findOneAndUpdate(
            { email },
            { otp, otpExpires, provider: 'local' },
            { upsert: true, new: true }
        );

        // 4. Send email
        await transporter.sendMail({
            from: `"JOBSKY" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your JOBSKY Verification Code',
            html: `<div style="font-family: sans-serif; text-align: center; padding: 20px;">
                     <h2>Welcome to JOBSKY!</h2>
                     <p>Your verification code is:</p>
                     <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; background: #f0f0f0; padding: 10px 20px; border-radius: 5px; display: inline-block;">${otp}</p>
                     <p>This code will expire in 10 minutes.</p>
                   </div>`,
        });

        res.status(200).json({ msg: 'Verification OTP sent to your email.' });

    } catch (error) {
        console.error('OTP Sending Error:', error);
        res.status(500).send('Server error while sending OTP.');
    }
});


// @route   POST /api/register
// @desc    Register a new user after OTP verification
// @access  Public
router.post('/register', async (req, res) => {
    const { fullName, email, password, contact, linkedin, dob, gender, otp } = req.body;

    try {
        // 1. Find user by email and verify OTP
        const user = await User.findOne({
            email,
            otp,
            otpExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid or expired OTP. Please try again.' });
        }

        // 2. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Update user with full details
        user.fullName = fullName;
        user.password = hashedPassword;
        user.contact = contact;
        user.linkedin = linkedin;
        user.dob = dob;
        user.gender = gender;
        user.otp = undefined; // Clear OTP fields
        user.otpExpires = undefined;
        
        await user.save();

        // 4. Generate and return JWT
        const token = generateToken(user.id);
        res.status(201).json({ token, user });

    } catch (error) {
        console.error('Registration Error:', error.message);
        res.status(500).send('Server error');
    }
});


// @route   POST /api/login
// @desc    Authenticate user with email and password
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if user exists and is a local user
        const user = await User.findOne({ email });
        if (!user || user.provider !== 'local' || !user.password) {
            return res.status(400).json({ msg: 'Invalid credentials or user not fully registered.' });
        }

        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // 3. Generate and return JWT
        const token = generateToken(user.id);
        res.json({ token, user });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


// @route   POST /api/google-login
// @desc    Authenticate user using Google token
// @access  Public
router.post('/google-login', async (req, res) => {
    const { token } = req.body;

    try {
        // 1. Verify Google token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { email, name } = ticket.getPayload();

        // 2. Find or create user
        let user = await User.findOne({ email });

        if (!user) {
            // If user doesn't exist, create a new one
            user = new User({
                fullName: name,
                email,
                provider: 'google',
            });
            await user.save();
        }

        // 3. Generate and return JWT
        const jwtToken = generateToken(user.id);
        res.json({ token: jwtToken, user });

    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: 'Google authentication failed' });
    }
});


// @route   GET /api/me
// @desc    Get current logged-in user's data
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
    try {
        // req.user is attached by the authMiddleware
        // Fetch user from DB, excluding the password field for security
        const user = await User.findById(req.user.id).select('-password -otp -otpExpires');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;