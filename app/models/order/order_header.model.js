const { NOW } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const orderHeader = sequelize.define(
    'order_header',
    {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // ord_no: {
      //   type: Sequelize.STRING(100), // Order Number
      //   allowNull: false,
      //   unique: {
      //     args: true,
      //     msg: 'Order number already exists',
      //   },
      // },
      ord_dt: {
        type: Sequelize.DATE, // Order Date
        defaultValue: NOW,
      },
      status: {
        type: Sequelize.STRING(3), //CRE, REJ, ACC
      },
      is_act: {
        type: Sequelize.BOOLEAN,
      },
      cre_on: {
        type: Sequelize.DATE, // Create Date
        defaultValue: NOW,
      },
    },
    {
      tableName: 'order_header',
      // Ignoring ORM default fields
      // We don't need createdAt
      createdAt: false,
      // We don't need updatedAt
      updatedAt: false,
    },
  );
  return orderHeader;
};
