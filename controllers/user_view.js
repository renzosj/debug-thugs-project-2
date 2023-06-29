const express = require('express');
const router = express.Router();
const user = require('../models/User');

router.get('/dashboard', (req, res) => {
    // user.findbypk yada yada
    // pass serialized user data to dashboard
    res.render('user-dashboard' /*,some object*/);
});

module.exports = router;