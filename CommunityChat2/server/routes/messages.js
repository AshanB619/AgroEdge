const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const multer = require('multer');
const jwt = require('jsonwebtoken');

// Configure Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

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

// Get all messages with user info
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT m.*, u.username, p.profile_picture FROM messages m JOIN users u ON m.user_id = u.id LEFT JOIN profiles p ON u.id = p.user_id ORDER BY m.created_at DESC'
        );
        const messages = result.rows;

        // Fetch reactions for each message and convert image_data to Base64
        for (let message of messages) {
            const reactionsResult = await pool.query(
                'SELECT * FROM reactions WHERE message_id = $1',
                [message.id]
            );
            message.reactions = reactionsResult.rows.map(r => ({
                userId: r.user_id.toString(),
                emoji: r.emoji,
            }));
            // Convert image_data to Base64 if it exists
            if (message.image_data) {
                message.image_data = Buffer.from(message.image_data).toString('base64');
            }
        }

        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get replies for a specific message
router.get('/:messageId/replies', async (req, res) => {
    const { messageId } = req.params;
    try {
        const result = await pool.query(
            'SELECT r.*, u.username, p.profile_picture FROM replies r JOIN users u ON r.user_id = u.id LEFT JOIN profiles p ON u.id = p.user_id WHERE r.message_id = $1 ORDER BY r.created_at ASC',
            [messageId]
        );
        const replies = result.rows;

        // Fetch reactions for each reply and convert image_data to Base64
        for (let reply of replies) {
            const reactionsResult = await pool.query(
                'SELECT * FROM reply_reactions WHERE reply_id = $1',
                [reply.id]
            );
            reply.reactions = reactionsResult.rows.map(r => ({
                userId: r.user_id.toString(),
                emoji: r.emoji,
            }));
            // Convert image_data to Base64 if it exists
            if (reply.image_data) {
                reply.image_data = Buffer.from(reply.image_data).toString('base64');
            }
        }

        res.json(replies);
    } catch (error) {
        console.error('Error fetching replies:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Upload image to PostgreSQL
router.post('/upload-image', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ error: 'No file uploaded' });

        // Return the image as a Base64 string
        const imageBase64 = file.buffer.toString('base64');
        res.json({ imageBase64 });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

module.exports = router;