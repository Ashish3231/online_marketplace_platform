const db = require('../models');
const Product = db.product;
const Sequelize = require('sequelize');
const Utils = require('../util/utility');

exports.createProduct = async (req, res) => {
  try {
    const file = req.files;
    console.log(file);
    if (!file.length) {
      return res
        .status(400)
        .json(Utils.sendData(false, 'content can not be empty'));
    }
    const data = JSON.parse(req.body.product);
    console.log('data: ', data);

    // Create a new product in the database
    const newProduct = await Product.create(data);

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
      const file = req.files;
      console.log(file);
      if (!file.length) {
        return res
          .status(400)
          .json(Utils.sendData(false, 'content can not be empty'));
      }
      const data = JSON.parse(req.body.product);
      const updatedProduct = await product.update(data);
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
