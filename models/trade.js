'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trade extends Model {
    static associate(models) {
      Trade.belongsTo(models.Portfolio, { foreignKey: 'portfolioId' });
      Trade.belongsTo(models.Share, { foreignKey: 'shareId' });
    }
  }

  Trade.init({
    portfolioId: DataTypes.INTEGER,
    shareId: DataTypes.INTEGER,
    tradeType: {
      type: DataTypes.ENUM('BUY', 'SELL'),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceAtTrade: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
  }, {
    sequelize,
    modelName: 'Trade',
  });

  return Trade;
};