
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        // Password is not required for OAuth providers like Google
        required: function() { return this.provider === 'local'; }
    },
    provider: {
        type: String,
        required: true,
        enum: ['local', 'google'],
        default: 'local',
    }
}, {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
