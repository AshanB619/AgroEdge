const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

require('dotenv').config();

//enviroment variables
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(16).toString('hex');   //creating random user ID

        const serverClient = connect(api_key, api_secret, app_id);  //connet to the Stream

        const hashedPassword = await bcrypt.hash(password, 10);   //crate password

        const token = serverClient.createUserToken(userId);  //crate token using userID

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });  //respone users to the frontend using json format
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);  //geting instance from the StreamChat

        const { users } = await client.queryUsers({ name: username });  //compare username from signup is equils to users

        if(!users.length) return res.status(400).json({ message: 'User not found' });  //if is not return
 
        const success = await bcrypt.compare(password, users[0].hashedPassword);  //compare created hashedPassword from signup is equils to password

        const token = serverClient.createUserToken(users[0].id);  //creating new token to userID assign with previous one

        if(success) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id});  //pass the data
        } else {
            res.status(500).json({ message: 'Incorrect password' });
        }
    } catch (error) {ads
        console.log(error);

        res.status(500).json({ message: error });
    }
};

module.exports = { signup, login }