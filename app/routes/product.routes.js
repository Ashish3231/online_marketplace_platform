const product = require('../controllers/product.controller');
const router = require('express').Router();
const { authJwt } = require('../middleware');

router.post('', [authJwt.verifyToken], product.createProduct);
router.get('', [authJwt.verifyToken], product.findAll);
router.get('/:id', [authJwt.verifyToken], product.findOne);
router.put('/:id', [authJwt.verifyToken], product.update);
router.delete('/:id', [authJwt.verifyToken], product.delete);

module.exports = router;
