import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
    try {
        // Get the token from the cookie
        const token = req.cookies.token;
        console.log("Token:", token);
        if (!token) {
            throw new Error('No token found in cookie.');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id });

        if (!user) {
            throw new Error('User not found for token.');
        }
        console.log("User found:", user);
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication error:', error.message);
        res.status(401).json({ error: 'Please authenticate.' });
    }
};

export default auth; 