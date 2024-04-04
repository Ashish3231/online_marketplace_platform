const user = require('../controllers/user.controller');
const router = require('express').Router();
const { authJwt } = require('../middleware');

router.get('', [authJwt.verifyToken], user.find);

module.exports = router;
