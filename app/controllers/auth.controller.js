const db = require('../models');
const config = require('../config/auth.config');
const User = db.user;
const Utils = require('../util/utility');
const LOGGER = require('../services/loggerService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (user) res.send({ message: 'User registered successfully!' });
    else res.send({ message: 'User not registered something wrong!' });
  } catch (err) {
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: 'User Not found.' });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password,
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: 'Invalid Password!',
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

    req.session.token = token;
    LOGGER.log('auth.controller.js', 'signin', 'Login in');
    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (err) {
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};

exports.signout = async (req, res) => {
  try {
    req.session.token = null;
    console.log('token:================', req.session);
    // console.log('token:================', req.session.token);
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    const errData = Utils.parseDBError(err);
    console.error(err, 'Error caught');
    return res
      .status(errData.status)
      .json(Utils.sendData(false, errData.message));
  }
};
