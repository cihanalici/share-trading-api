'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    static associate(models) {
      Portfolio.belongsTo(models.User, { foreignKey: 'userId' });
      Portfolio.hasMany(models.Trade, { foreignKey: 'portfolioId' });
    }
  }

  Portfolio.init({
    userId: DataTypes.INTEGER,
    totalValue: DataTypes.DECIMAL(10, 2),
  }, {
    sequelize,
    modelName: 'Portfolio',
  });

  return Portfolio;
};