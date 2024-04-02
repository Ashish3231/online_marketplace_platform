const router = require('express').Router();
const authUser = require('./auth.routes');
const product = require('./product.routes');

router.use('/api/auth', authUser);
router.use('/api/product', product);

module.exports = router;
