// =============================================================================
// JOBSKY BACKEND SERVER
// =============================================================================
//
// --- SETUP INSTRUCTIONS ---
//
// 1. **Install Dependencies**:
//    Open your terminal in the project root and run:
//    `npm install`
//
// 2. **Create a `.env` file**:
//    In the same directory as this `server.js` file, create a new file named `.env`.
//    This file will store your secret keys and configuration.
//
// 3. **Configure Environment Variables**:
//    Add the following lines to your `.env` file, replacing the placeholder values:
//
//    MONGO_URI=mongodb://localhost:27017/jobsky
//    JWT_SECRET=a_very_strong_and_long_secret_key_for_jwt
//    PORT=5001
//    GOOGLE_CLIENT_ID=455952654400-po5kkrvtkfk8ccbra02corfqdkdrpa17.apps.googleusercontent.com
//
//    # Email Configuration (for OTP verification)
//    # Example for Gmail. For other services (SendGrid, etc.), adjust as needed.
//    EMAIL_HOST=smtp.gmail.com
//    EMAIL_PORT=587
//    EMAIL_SECURE=false # true for 465, false for other ports
//    EMAIL_USER=your_email@gmail.com
//    EMAIL_PASS=your_gmail_app_password
//
//    - `MONGO_URI`: The connection string for your MongoDB database.
//    - `JWT_SECRET`: A long, random string used to sign your JWTs.
//    - `PORT`: The port your backend server will run on (e.g., 5001).
//    - `GOOGLE_CLIENT_ID`: The same Google Client ID you used in your React app.
//    - `EMAIL_...`: Your SMTP server details for sending emails. For Gmail, you'll
//      need to generate an "App Password".
//
// 4. **Run the Server**:
//    - For development (server restarts automatically on changes): `npm run dev`
//    - For production: `npm start`
//
//    You should see "Server is running on port 5001" and "MongoDB connected" in your console.
//
// =============================================================================

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// --- Middleware ---
// Enable Cross-Origin Resource Sharing (CORS) to allow frontend communication
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// --- Database Connection ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        // Exit process with failure
        process.exit(1);
    }
};

connectDB();

// --- API Routes ---
// All authentication-related routes will be handled by './routes/auth'
app.use('/api', require('./routes/auth'));

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});