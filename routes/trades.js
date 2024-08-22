const express = require('express');
const router = express.Router();
const { Portfolio, Share, Trade } = require('../models');
const { authMiddleware } = require('./auth');

router.post('/trade', authMiddleware, async (req, res) => {
    const { portfolioId, symbol, tradeType, quantity } = req.body;
    try {
        // Ensure the portfolio exists and belongs to the authenticated user
        const portfolio = await Portfolio.findOne({ where: { id: portfolioId, userId: req.user.id } });
        if (!portfolio) return res.status(404).json({ error: 'Portfolio not found' });

        // Ensure the share exists
        const share = await Share.findOne({ where: { symbol } });
        if (!share) return res.status(404).json({ error: 'Share not found' });

        const latestPrice = share.price;

        if (tradeType === 'SELL') {
            // Ensure sufficient shares to sell
            const totalBought = await Trade.sum('quantity', { where: { portfolioId, shareId: share.id, tradeType: 'BUY' } });
            const totalSold = await Trade.sum('quantity', { where: { portfolioId, shareId: share.id, tradeType: 'SELL' } });
            if ((totalBought - totalSold) < quantity) {
                return res.status(400).json({ error: 'Insufficient shares to sell' });
            }
        }

        // Record the trade
        const trade = await Trade.create({ portfolioId, shareId: share.id, tradeType, quantity, priceAtTrade: latestPrice });
        res.status(201).json(trade);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
