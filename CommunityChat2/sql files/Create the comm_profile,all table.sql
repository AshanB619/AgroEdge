-- Create the comm_profile table
CREATE TABLE comm_profile (
    user_id VARCHAR(10) PRIMARY KEY REFERENCES users(id),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    profile_picture BYTEA, -- Store profile picture as BYTEA
    member_since TIMESTAMP NOT NULL,
    message_count INTEGER DEFAULT 0
);

-- Create the comm_messages table
CREATE TABLE comm_messages (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(10) REFERENCES users(id),
    content TEXT NOT NULL,
    image_data BYTEA, -- Store image as BYTEA
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    likes INTEGER DEFAULT 0,
    hearts INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0
);

-- Create the comm_replies table
CREATE TABLE comm_replies (
    id SERIAL PRIMARY KEY,
    message_id INTEGER REFERENCES comm_messages(id),
    user_id VARCHAR(10) REFERENCES users(id),
    content TEXT NOT NULL,
    image_data BYTEA, -- Optional image for replies
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the reactions table for messages
CREATE TABLE comm_message_reactions (
    id SERIAL PRIMARY KEY,
    message_id INTEGER REFERENCES comm_messages(id),
    user_id VARCHAR(10) REFERENCES users(id),
    emoji VARCHAR(10) NOT NULL,
    UNIQUE(message_id, user_id, emoji)
);

-- Create the reactions table for replies
CREATE TABLE comm_reply_reactions (
    id SERIAL PRIMARY KEY,
    reply_id INTEGER REFERENCES comm_replies(id),
    user_id VARCHAR(10) REFERENCES users(id),
    emoji VARCHAR(10) NOT NULL,
    UNIQUE(reply_id, user_id, emoji)
);