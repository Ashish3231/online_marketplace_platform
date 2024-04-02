const { DataTypes, NOW } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    'product',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.DOUBLE,
      },
      available_qty: {
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.INTEGER,
      },
      cre_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      cre_on: {
        type: DataTypes.DATE,
        defaultValue: NOW,
      },
      upd_by: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      upd_on: {
        type: DataTypes.DATE,
        defaultValue: NOW,
      },
    },
    {
      tableName: 'product',
      // Ignoring ORM default fields
      // We don't need createdAt
      createdAt: false,
      // We don't need updatedAt
      updatedAt: false,
    },
  );
  return Product;
};
