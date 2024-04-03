const product = require('../controllers/product.controller');
const router = require('express').Router();
const { authJwt } = require('../middleware');
const upload = require('../middleware/multer/mime.validator');

router.post(
  '',
  [authJwt.verifyToken],
  upload.array('file', 5), //'file' is the name of the field in the form from which files will be uploaded. This is typically the name attribute of the HTML input element used to upload files.
  // 5 specifies the maximum number of files that can be uploaded at once.
  product.createProduct,
);
router.get('', [authJwt.verifyToken], product.findAll);
router.get('/:id', [authJwt.verifyToken], product.findOne);
router.put(
  '/:id',
  [authJwt.verifyToken],
  upload.array('file', 5),
  product.update,
);
router.delete('/:id', [authJwt.verifyToken], product.delete);

module.exports = router;
