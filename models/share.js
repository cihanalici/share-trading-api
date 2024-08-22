'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Share extends Model {
    static associate(models) {
      Share.hasMany(models.Trade, { foreignKey: 'shareId' });
    }
  }

  Share.init({
    symbol: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
      validate: {
        isUppercase: true,
        len: 3,
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
  }, {
    sequelize,
    modelName: 'Share',
  });

  return Share;
};