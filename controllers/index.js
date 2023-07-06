// Controllers index
const express = require('express');
const router = express.Router();

router.use('/', require ('./homeRoutes/index'));
router.use('/user', require('./userRoutes/index'));

module.exports = router;