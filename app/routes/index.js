const router = require('express').Router();
const authUser = require('./auth.routes');
const product = require('./product.routes');
const order = require('./order.routes');

router.use('/api/auth', authUser);
router.use('/api/product', product);
router.use('/api/order', order);

module.exports = router;
