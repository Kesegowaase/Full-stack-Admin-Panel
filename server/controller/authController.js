import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from "express-async-handler"

const handleLogin = expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) return res.sendStatus(401); //Unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
        // create JWTs
        const accessToken = jwt.sign(
            {
                "username": foundUser.username,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Send authorization roles and access token to user
        res.send({
            username: foundUser.username,
            token: accessToken
        });

    } else {
        res.sendStatus(401);
    }
});

export { handleLogin };