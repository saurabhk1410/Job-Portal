import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import auth from "./middleware/auth.js";

dotenv.config();

const app = express();

// CORS configuration to allow frontend origin and credentials
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend origin
    credentials: true // Allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
// Signup
app.post('/api/auth/signup', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    try {
        console.log("Login attempt");
        const { sapId, password } = req.body;
        const user = await User.findOne({ sapId });

        if (!user) {
            console.error('Login failed: User not found for SAP ID:', sapId);
            throw new Error('Invalid login credentials');
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.error('Login failed: Password mismatch for user:', user.sapId);
            throw new Error('Incorrect password');
        }
        console.log("Generating token");
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        console.log('Login successful for user:', user.sapId);
        res.json({ user });
    } catch (error) {
        console.error('Login error in catch block:', error.message);
        res.status(400).json({ error: error.message });
    }
});

// Get user profile
app.get('/api/profile', auth, async (req, res) => {
    try {
        // req.user is populated by the auth middleware
        console.log("Fetching user profile");
        res.json(req.user);
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        // Return a 500 Internal Server Error if fetching the user fails after auth
        res.status(500).json({ error: 'Failed to fetch user profile data.' });
    }
});

// Auth check endpoint
app.get('/api/auth/check', auth, (req, res) => {
    try {
        // If we reach here, the token was valid and user is attached by auth middleware
        res.json({ isAuthenticated: true, user: req.user });
    } catch (error) {
        console.error('Error in auth check endpoint:', error.message);
        // This catch might not be strictly necessary if auth middleware handles errors, but good practice
        res.status(500).json({ error: 'Authentication check failed internally.' });
    }
});

// Logout
app.post('/api/auth/logout', (req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logged out successfully' });
});

// Update user profile
app.patch('/api/profile', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'dob', 'gender', 'linkedIn', 'resumeUrl', 'phone', 'location', 'skills', 'experience'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        updates.forEach(update => req.user[update] = req.body[update]);
        await req.user.save();
        res.json(req.user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

