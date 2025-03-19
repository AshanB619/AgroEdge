-- Reactions for messages
INSERT INTO comm_message_reactions (message_id, user_id, emoji) VALUES
-- msg1 (message_id: 1) reactions: user1, user3, user4
(6, '005a8061c6', '👍'), -- user1
(6, '00ad412e38', '❤️'), -- user3
(6, '00f583d7a9', '😂'), -- user4
-- msg2 (message_id: 2) reactions: user1, user4, user5
(7, '005a8061c6', '👍'), -- user1
(7, '00f583d7a9', '❤️'), -- user4
(7, '014be6a8c3', '😂'), -- user5
-- msg3 (message_id: 3) reactions: user3, user5
(8, '00ad412e38', '👏'), -- user3
(8, '014be6a8c3', '😮'), -- user5
-- msg4 (message_id: 4) reactions: user2, user5
(9, '006f063faa', '👍'), -- user2
(9, '014be6a8c3', '❤️'), -- user5
-- msg5 (message_id: 5) reactions: user2, user1
(10, '006f063faa', '👍'), -- user2
(10, '005a8061c6', '❤️'); -- user1

-- Reactions for replies
INSERT INTO comm_reply_reactions (reply_id, user_id, emoji) VALUES
-- reply1 (reply_id: 1) reactions: user2, user3
(1, '006f063faa', '👍'), -- user2
(1, '00ad412e38', '❤️'), -- user3
-- reply2 (reply_id: 2) reactions: user2
(2, '006f063faa', '🙏'), -- user2
-- reply3 (reply_id: 3) reactions: user3
(3, '00ad412e38', '👍'), -- user3
-- reply5 (reply_id: 4) reactions: user3, user1
(4, '00ad412e38', '👍'), -- user3
(4, '005a8061c6', '❤️'), -- user1
-- reply6 (reply_id: 5) reactions: user1
(5, '005a8061c6', '👍'), -- user1
-- reply4 (reply_id: 6) reactions: user4
(6, '00f583d7a9', '🙏'), -- user4
-- reply7 (reply_id: 7) reactions: user5, user1
(7, '014be6a8c3', '👍'), -- user5
(7, '005a8061c6', '👏'); -- user1