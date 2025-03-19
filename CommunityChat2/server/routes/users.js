const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all users (for the message list)
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT u.id, u.username, u.email, u.created_at, p.location, p.interests, p.bio, p.profile_picture, p.member_since, p.phone, p.message_count ' +
            'FROM users u LEFT JOIN profiles p ON u.id = p.user_id'
        );

        const users = result.rows.map(user => ({
            id: user.id.toString(),
            name: user.username,
            email: user.email,
            avatarUrl: user.profile_picture || '/placeholder.svg?height=96&width=96',
            location: user.location || 'Not specified',
            tags: user.interests || [],
            phone: user.phone || 'Not specified',
            messageCount: user.message_count || 0,
            joinDate: user.created_at || user.member_since,
            bio: user.bio || '',
        }));

        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;