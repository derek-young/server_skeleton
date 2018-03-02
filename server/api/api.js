const express = require('express');
const userRoutes = require('./user/userRoutes');
const router = express.Router();

router.use('/user', userRoutes);
// Additional routes example:
// router.use('/other-route', otherRoutes);

module.exports = router;
