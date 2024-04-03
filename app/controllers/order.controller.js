const db = require('../models');
const OrderHeader = db.orderHeader;
const OrderLine = db.orderLine;
const Sequelize = require('sequelize');
const Utils = require('../util/utility');

exports.orderCreate = async (req, res) => {
  try {
    const data = req.body;
    const newOrder = await OrderHeader.create(data, {
      include: {
        model: OrderLine,
        as: 'item',
      },
    });
    return res
      .status(201)
      .json(Utils.sendData(true, 'Data Added succesfully', newOrder));
  } catch (err) {
    // Handle errors
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};

// PUT
exports.update = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const orderId = req.params.id;
    const order = await OrderHeader.findByPk(orderId);
    if (order === null) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      const data = req.body;
      const items = data.item;
      await OrderHeader.update(data, {
        include: {
          model: OrderLine,
          as: 'item',
        },
        where: { id: orderId },
        transaction: t,
      });

      await OrderLine.bulkCreate(items, {
        updateOnDuplicate: ['pono', 'product_id', 'qty', 'amt', 'qty'],
        conflictAttributes: ['id'],
        transaction: t,
      });
      await t.commit();
      return res.status(201).json(Utils.sendData(true, 'Order updated'));
    }
  } catch (err) {
    await t.rollback();
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};

// findOne API
exports.orderFindOne = async (req, res) => {
  try {
    const orderId = req.params.id; // Assuming the order ID is passed in the URL parameter
    const order = await OrderHeader.findOne({
      where: { id: orderId },
      include: [{ model: OrderLine, as: 'item' }],
    });

    if (!order) {
      return res.status(404).json(Utils.sendData(false, 'Order not found'));
    }

    return res.status(200).json(Utils.sendData(true, 'Order found', order));
  } catch (err) {
    // Handle errors
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};

// findAll API
exports.orderFindAll = async (req, res) => {
  try {
    const orders = await OrderHeader.findAll({
      include: [{ model: OrderLine, as: 'item' }],
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json(Utils.sendData(false, 'No orders found'));
    }

    return res.status(200).json(Utils.sendData(true, 'Orders found', orders));
  } catch (err) {
    // Handle errors
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};

// Delete API
exports.orderDelete = async (req, res) => {
  try {
    const orderId = req.params.id; // Assuming the order ID is passed in the URL parameter

    // Check if the order exists
    const order = await OrderHeader.findByPk(orderId);
    if (!order) {
      return res.status(404).json(Utils.sendData(false, 'Order not found'));
    }

    // Delete the order
    await order.destroy();

    return res
      .status(200)
      .json(Utils.sendData(true, 'Order deleted successfully'));
  } catch (err) {
    // Handle errors
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};
