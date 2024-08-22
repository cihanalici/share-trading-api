'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);

    // Create 5 users with hashed passwords
    const users = await queryInterface.bulkInsert('Users', [
      {
        name: 'User One',
        email: 'user1@example.com',
        password: await bcrypt.hash('password123', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User Two',
        email: 'user2@example.com',
        password: await bcrypt.hash('password123', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User Three',
        email: 'user3@example.com',
        password: await bcrypt.hash('password123', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User Four',
        email: 'user4@example.com',
        password: await bcrypt.hash('password123', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User Five',
        email: 'user5@example.com',
        password: await bcrypt.hash('password123', salt),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], { returning: true });

    // Create 5 portfolios for the users
    const portfolios = await queryInterface.bulkInsert('Portfolios', users.map(user => ({
      userId: user.id,
      totalValue: 10000.00,
      createdAt: new Date(),
      updatedAt: new Date()
    })), { returning: true });

    // Create some shares
    const shares = await queryInterface.bulkInsert('Shares', [
      { symbol: 'AAA', price: 100.00, createdAt: new Date(), updatedAt: new Date() },
      { symbol: 'BBB', price: 200.00, createdAt: new Date(), updatedAt: new Date() },
      { symbol: 'CCC', price: 300.00, createdAt: new Date(), updatedAt: new Date() },
      { symbol: 'DDD', price: 400.00, createdAt: new Date(), updatedAt: new Date() },
      { symbol: 'EEE', price: 500.00, createdAt: new Date(), updatedAt: new Date() }
    ], { returning: true });

    // Create trades (BUY and SELL)
    await queryInterface.bulkInsert('Trades', [
      { portfolioId: portfolios[0].id, shareId: shares[0].id, tradeType: 'BUY', quantity: 10, priceAtTrade: 100.00, createdAt: new Date(), updatedAt: new Date() },
      { portfolioId: portfolios[0].id, shareId: shares[1].id, tradeType: 'SELL', quantity: 5, priceAtTrade: 200.00, createdAt: new Date(), updatedAt: new Date() },
      { portfolioId: portfolios[1].id, shareId: shares[2].id, tradeType: 'BUY', quantity: 15, priceAtTrade: 300.00, createdAt: new Date(), updatedAt: new Date() },
      { portfolioId: portfolios[2].id, shareId: shares[3].id, tradeType: 'SELL', quantity: 7, priceAtTrade: 400.00, createdAt: new Date(), updatedAt: new Date() },
      { portfolioId: portfolios[3].id, shareId: shares[4].id, tradeType: 'BUY', quantity: 20, priceAtTrade: 500.00, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Trades', null, {});
    await queryInterface.bulkDelete('Shares', null, {});
    await queryInterface.bulkDelete('Portfolios', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
