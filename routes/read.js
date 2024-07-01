// read.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        console.log(`Fetched ${users.length} users.`);
        res.json(users);
    } catch (err) {
        console.error('Failed to fetch users:', err);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});





// GET details of a specific user by email
router.get('/user/:email', async (req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user details' });
    }
});


module.exports = router;
