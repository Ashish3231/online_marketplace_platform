const db = require('../models');
const Product = db.product;
const Sequelize = require('sequelize');
const Utils = require('../util/utility');

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      state,
      total_amount,
      available_qty,
      user_id,
      cre_by,
      upd_by,
    } = req.body;

    // Create a new product in the database
    const newProduct = await Product.create({
      name,
      state,
      total_amount,
      available_qty,
      user_id,
      cre_by,
      upd_by,
      // Additional fields like cre_by, cre_on, upd_by, upd_on will be automatically filled by Sequelize
    });

    // Send back the newly created product as response
    return res
      .status(201)
      .json(Utils.sendData(true, 'Data Added succesfully', newProduct));
  } catch (err) {
    // Handle errors
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};

// GET /products
exports.findAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    console.log('token:================', req.session);
    console.log('token:================', req.session.token);
    return res.status(201).json(Utils.sendData(true, 'Data  Found', products));
  } catch (err) {
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};

// GET
exports.findOne = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product === null) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      return res.status(201).json(Utils.sendData(true, 'Data  Found', product));
    }
  } catch (err) {
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};

// PUT
exports.update = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product === null) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      const updatedProduct = await product.update({
        ...req.body,
        upd_on: new Date(), // Update the upd_on field to the current date/time
      });
      return res
        .status(201)
        .json(Utils.sendData(true, 'Data  Found', updatedProduct));
    }
  } catch (err) {
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};

//Delete
// DELETE /products/:id
exports.delete = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product === null) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      await product.destroy();
      return res
        .status(201)
        .json(Utils.sendData(true, 'product deleted succesfully'));
    }
  } catch (err) {
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};
