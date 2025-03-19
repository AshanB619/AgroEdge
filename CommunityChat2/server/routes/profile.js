const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

// Get user profile
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT u.id, u.username, u.email, u.created_at, p.location, p.interests, p.bio, p.profile_picture, p.member_since, p.phone, p.message_count ' +
            'FROM users u LEFT JOIN profiles p ON u.id = p.user_id WHERE u.id = $1',
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userProfile = result.rows[0];
        res.json({
            id: userProfile.id.toString(),
            name: userProfile.username,
            email: userProfile.email,
            avatarUrl: userProfile.profile_picture || '/placeholder.svg?height=96&width=96',
            location: userProfile.location || 'Not specified',
            tags: userProfile.interests || [],
            phone: userProfile.phone || 'Not specified',
            messageCount: userProfile.message_count || 0,
            joinDate: userProfile.created_at || userProfile.member_since,
            bio: userProfile.bio || '',
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update user profile
router.put('/', authenticateToken, async (req, res) => {
    const { location, interests, bio, phone } = req.body;
    try {
        await pool.query(
            'INSERT INTO profiles (user_id, location, interests, bio, phone) VALUES ($1, $2, $3, $4, $5) ' +
            'ON CONFLICT (user_id) DO UPDATE SET location = $2, interests = $3, bio = $4, phone = $5',
            [req.user.id, location, interests, bio, phone]
        );
        res.json({ message: 'Profile updated' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;