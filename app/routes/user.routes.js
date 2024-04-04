const user = require('../controllers/user.controller');
const router = require('express').Router();
const { authJwt } = require('../middleware');

router.get('', [authJwt.verifyToken], user.find);
router.post('/message', [authJwt.verifyToken], user.message);

module.exports = router;
