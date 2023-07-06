// Christina adding routes and sessions to page

const express = require('express');
const router = express.Router();
 

// router.use('/user', require('./user'));
// router.use('/login', require('./login'));
// router.use('/message', require('./message')); 
// router.use('/signup', require('./signup'));
router.use('/user', require('./userRoutes'));
router.use('/', require ('./homeroutes'));



module.exports = router;