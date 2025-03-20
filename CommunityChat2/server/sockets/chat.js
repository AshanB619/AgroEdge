const { Server } = require('socket.io');
const pool = require('../config/db');

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('join', (room) => {
      socket.join(room);
    });

    socket.on('sendMessage', async (messageData, callback) => {
      try {
        const { userId, content, imageBase64 } = messageData;
        const result = await pool.query(
          'INSERT INTO comm_message (user_id, content, image_data, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *',
          [userId, content, imageBase64 || null]
        );

        const newMessage = result.rows[0];
        newMessage.reactions = [];
        newMessage.username = (await pool.query('SELECT username FROM comm_profile WHERE user_id = $1', [userId])).rows[0].username;
        newMessage.profile_picture = (await pool.query('SELECT profile_picture FROM comm_profile WHERE user_id = $1', [userId])).rows[0].profile_picture;

        io.to('community-hub').emit('newMessage', newMessage);
        // Only call callback if it exists and is a function
        if (typeof callback === 'function') {
          callback({ status: 'success', message: newMessage });
        }
      } catch (error) {
        console.error('Error sending message:', error);
        // Only call callback if it exists and is a function
        if (typeof callback === 'function') {
          callback({ status: 'error', error: 'Failed to send message' });
        }
      }
    });

    socket.on('sendReply', async (replyData, callback) => {
      try {
        const { messageId, userId, content, imageBase64 } = replyData;
        const result = await pool.query(
          'INSERT INTO comm_reply (message_id, user_id, content, image_data, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
          [messageId, userId, content, imageBase64 || null]
        );

        const newReply = result.rows[0];
        newReply.reactions = [];
        newReply.username = (await pool.query('SELECT username FROM comm_profile WHERE user_id = $1', [userId])).rows[0].username;
        newReply.profile_picture = (await pool.query('SELECT profile_picture FROM comm_profile WHERE user_id = $1', [userId])).rows[0].profile_picture;

        io.to('community-hub').emit('newReply', newReply);
        if (typeof callback === 'function') {
          callback({ status: 'success', reply: newReply });
        }
      } catch (error) {
        console.error('Error sending reply:', error);
        if (typeof callback === 'function') {
          callback({ status: 'error', error: 'Failed to send reply' });
        }
      }
    });

    socket.on('reactToMessage', async ({ messageId, userId, emoji }, callback) => {
      try {
        const message = (await pool.query('SELECT * FROM comm_message WHERE id = $1', [messageId])).rows[0];
        let reactions = message.reactions || [];
        const existingReaction = reactions.find((r) => r.userId === userId && r.emoji === emoji);

        if (existingReaction) {
          reactions = reactions.filter((r) => !(r.userId === userId && r.emoji === emoji));
          io.to('community-hub').emit('reactionUpdated', { messageId, userId, emoji, added: false });
        } else {
          reactions.push({ userId, emoji });
          io.to('community-hub').emit('reactionUpdated', { messageId, userId, emoji, added: true });
        }

        await pool.query('UPDATE comm_message SET reactions = $1 WHERE id = $2', [reactions, messageId]);
        if (typeof callback === 'function') {
          callback({ status: 'success' });
        }
      } catch (error) {
        console.error('Error updating reaction:', error);
        if (typeof callback === 'function') {
          callback({ status: 'error', error: 'Failed to update reaction' });
        }
      }
    });

    socket.on('reactToReply', async ({ messageId, replyId, userId, emoji }, callback) => {
      try {
        const reply = (await pool.query('SELECT * FROM comm_reply WHERE id = $1', [replyId])).rows[0];
        let reactions = reply.reactions || [];
        const existingReaction = reactions.find((r) => r.userId === userId && r.emoji === emoji);

        if (existingReaction) {
          reactions = reactions.filter((r) => !(r.userId === userId && r.emoji === emoji));
          io.to('community-hub').emit('replyReactionUpdated', { messageId, replyId, userId, emoji, added: false });
        } else {
          reactions.push({ userId, emoji });
          io.to('community-hub').emit('replyReactionUpdated', { messageId, replyId, userId, emoji, added: true });
        }

        await pool.query('UPDATE comm_reply SET reactions = $1 WHERE id = $2', [reactions, replyId]);
        if (typeof callback === 'function') {
          callback({ status: 'success' });
        }
      } catch (error) {
        console.error('Error updating reply reaction:', error);
        if (typeof callback === 'function') {
          callback({ status: 'error', error: 'Failed to update reply reaction' });
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};