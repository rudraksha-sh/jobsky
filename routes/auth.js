
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// --- Helper Function to Generate JWT ---
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};


// @route   POST /api/register
// @desc    Register a new user with email and password
// @access  Public
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // 2. Create a new user instance
        user = new User({ email, password, provider: 'local' });

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 4. Save user to the database
        await user.save();

        // 5. Generate and return JWT
        const token = generateToken(user.id);
        res.status(201).json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


// @route   POST /api/login
// @desc    Authenticate user with email and password
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if user exists
        const user = await User.findOne({ email });
        if (!user || user.provider !== 'local') {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // 2. Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // 3. Generate and return JWT
        const token = generateToken(user.id);
        res.json({ token });

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
        const { email } = ticket.getPayload();

        // 2. Find or create user
        let user = await User.findOne({ email });

        if (!user) {
            // If user doesn't exist, create a new one
            user = new User({
                email,
                provider: 'google',
            });
            await user.save();
        }

        // 3. Generate and return JWT
        const jwtToken = generateToken(user.id);
        res.json({ token: jwtToken });

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
        const user = await User.findById(req.user.id).select('-password');
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
