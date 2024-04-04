const router = require('express').Router();
const authUser = require('./auth.routes');
const product = require('./product.routes');
const order = require('./order.routes');
const user = require('./user.routes');

router.use('/api/auth', authUser);
router.use('/api/product', product);
router.use('/api/order', order);
router.use('/api/user', user);

module.exports = router;
