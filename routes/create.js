const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/create
router.post('/', async (req, res) => {
    try {
        console.log('Received POST request to create user:', req.body);

        const newUser = new User(req.body);
        console.log('New user object:', newUser);

        const savedUser = await newUser.save();
        console.log('Saved user:', savedUser);

        res.status(201).json(savedUser);
    } catch (err) {
        console.error('Error saving user:', err.message, err);
        res.status(500).json({ error: 'Failed to save user', details: err.message });
    }
});

module.exports = router;
