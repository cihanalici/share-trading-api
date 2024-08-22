const express = require('express');
const router = express.Router();
const { Portfolio } = require('../models');
const { authMiddleware } = require('./auth');

router.post('/register', authMiddleware, async (req, res) => {
    try {
        const portfolio = await Portfolio.create({ userId: req.user.id });
        res.status(201).json(portfolio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
