INSERT INTO comm_profile (user_id, username, email, member_since, message_count)
SELECT 
    id,
    username,
    email,
    created_at,
    CASE 
        WHEN id = '005a8061c6' THEN 42  -- John Farmer (user1)
        WHEN id = '006f063faa' THEN 28  -- Maria Rodriguez (user2)
        WHEN id = '00ad412e38' THEN 35   -- Robert Johnson (user3)
        WHEN id = '00f583d7a9' THEN 19  -- Sarah Williams (user4)
        WHEN id = '014be6a8c3' THEN 23  -- David Chen (user5)
        ELSE 0
    END AS message_count
FROM users
WHERE id IN ('005a8061c6', '006f063faa', '00ad412e38', '00f583d7a9', '014be6a8c3');