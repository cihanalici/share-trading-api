const express = require('express');
const router = express.Router();
const { Share } = require('../models');
const { authMiddleware } = require('./auth');

// Register a new share
router.post('/register', authMiddleware, async (req, res) => {
    const { symbol, price } = req.body;
    try {
        const share = await Share.create({ symbol, price });
        res.status(201).json(share);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update share price
router.put('/update/price', authMiddleware, async (req, res) => {
    const { symbol, price } = req.body;
    try {
        const share = await Share.findOne({ where: { symbol } });
        if (!share) return res.status(404).json({ error: 'Share not found' });

        share.price = price;
        await share.save();
        res.status(200).json(share);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
