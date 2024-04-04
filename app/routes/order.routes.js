const order = require('../controllers/order.controller');
const router = require('express').Router();
const { authJwt } = require('../middleware');

router.post('', order.orderCreate);
router.get('', [authJwt.verifyToken], order.orderFindAll);
router.get('/:id', [authJwt.verifyToken], order.orderFindOne);
router.put('/:id', [authJwt.verifyToken], order.update);
router.delete('/:id', [authJwt.verifyToken], order.orderDelete);

module.exports = router;
