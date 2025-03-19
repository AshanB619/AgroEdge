const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
        req.user = user;
        next();
    });
};

// Get user profile
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT u.id, u.username, u.email, p.* FROM users u LEFT JOIN profiles p ON u.id = p.user_id WHERE u.id = $1',
            [req.user.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update user profile
router.put('/', authenticateToken, async (req, res) => {
    const { location, interests, bio, phone } = req.body;
    try {
        await pool.query(
            'INSERT INTO profiles (user_id, location, interests, bio, phone) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (user_id) DO UPDATE SET location = $2, interests = $3, bio = $4, phone = $5',
            [req.user.id, location, interests, bio, phone]
        );
        res.json({ message: 'Profile updated' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;