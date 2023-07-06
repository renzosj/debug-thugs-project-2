const express = require('express');
const router = express.Router();

router.use('/users', require('./users-routes'));
router.use('/chats', require('./chats-routes'));
router.use('/messages', require('./messages-routes')); 

module.exports = router;

