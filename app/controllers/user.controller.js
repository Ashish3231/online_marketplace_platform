const db = require('../models');
const User = db.user;
const Product = db.product;
const OrderHeader = db.orderHeader;
const OrderLine = db.orderLine;
const Sequelize = require('sequelize');
const Utils = require('../util/utility');
const rabbitServer = require('../../app/services/rabbitMQ/rabbitServer');

// find
exports.find = async (req, res) => {
  try {
    const userId = req.userId;
    // const userId = 1; // Assuming the order ID is passed in the URL parameter
    const userDetails = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password'] },
      include: [
        { model: Product, as: 'user_prdct' },
        {
          model: OrderHeader,
          as: 'user_buy_order', // Unique alias for seller orders
          include: {
            model: OrderLine,
            as: 'item',
          },
        },
        {
          model: OrderHeader,
          as: 'user_sell_order', // Unique alias for buyer orders
          include: {
            model: OrderLine,
            as: 'item',
          },
        },
      ],
    });

    if (!userDetails) {
      return res.status(404).json(Utils.sendData(false, 'User not found'));
    }

    return res
      .status(200)
      .json(Utils.sendData(true, 'User found', userDetails));
  } catch (err) {
    // Handle errors
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};

exports.message = async (req, res) => {
  try {
    const userId = req.userId;
    const { msg, queue } = req.body;
    rabbitServer.sendMessage(msg, queue);
    return res.status(200).json(Utils.sendData(true, 'message send'));
  } catch (err) {
    // Handle errors
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};
