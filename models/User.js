const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        // Password is not required for OAuth providers or for users who haven't completed OTP verification
    },
    provider: {
        type: String,
        required: true,
        enum: ['local', 'google'],
        default: 'local',
    },
    contact: {
        type: String,
        trim: true,
    },
    linkedin: {
        type: String,
        trim: true,
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
    },
    // Fields for OTP verification
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
}, {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);