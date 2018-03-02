const router = require('express').Router();
const userCtrl = require('./userController');

router.get('/', userCtrl.signin);
router.post('/', userCtrl.create);

module.exports = router;
