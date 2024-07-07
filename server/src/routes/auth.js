const express = require('express');
const { User } = require('../db');
const { authentication } = require('../middleware/jwt');
const jwt = require('jsonwebtoken');
const { authVariables } = require('../zodVariables/authvariable');
const secretKey = 'sEcreTForYoU'
const router = express.Router();

router.post('/signup', async (req, res) => {
    const parsedInput = authVariables.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(401).json({ message: 'Wrong Inputs' });
    } else {
        const { username, password } = parsedInput.data;
        const user = await User.findOne({ username });
        if (user) {
            res.status(401).json({ message: 'User already exists' });
        } else {
            const newUser = new User({ username, password });
            if (secretKey) {
                const token = jwt.sign({ id: newUser._id }, secretKey);
                await newUser.save();
                res.status(201).json({ message: 'User Created successfully', token, username: newUser.username, userId: newUser._id });
            }
        }
    }
});

router.post('/signin', async (req, res) => {
    const parsedInput = authVariables.safeParse(req.body);
    if (!parsedInput.success) {
        res.status(401).json({ message: 'Wrong credentials' });
    } else {
        const { username, password } = parsedInput.data;
        const user = await User.findOne({ username, password });
        if (user) {
            if (secretKey) {
                const token = jwt.sign({ id: user._id }, secretKey);
                res.status(201).json({ message: 'User signed in successfully', token, username: user.username, userId: user._id });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
});

router.get('/me', authentication, async (req, res) => {
    const userId = req.headers["userId"];
    console.log(userId);
    const user = await User.findById(userId);
    if (user) {
        res.status(201).json({ username: user.username });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

module.exports = router;
