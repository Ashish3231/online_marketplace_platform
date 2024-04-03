const { NOW } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const orderLine = sequelize.define(
    'order_line',
    {
      id: {
        type: Sequelize.BIGINT, // ID (Primary Key)
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      ord_id: {
        type: Sequelize.BIGINT, // order ID (Foreign Key)
      },
      pono: {
        type: Sequelize.BIGINT, //
      },
      product_id: {
        type: Sequelize.BIGINT, //
      },
      qty: {
        type: Sequelize.BIGINT, //
      },
      amt: {
        type: Sequelize.DOUBLE, // total amount
      },
      cre_on: {
        type: Sequelize.DATE, // Created Date
        defaultValue: NOW,
      },
    },
    {
      tableName: 'order_line',
      // Ignoring ORM default fields
      // We don't need createdAt
      createdAt: false,
      // We don't need updatedAt
      updatedAt: false,
    },
  );
  return orderLine;
};
