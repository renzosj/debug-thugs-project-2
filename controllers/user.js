const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    res.render('user-dashboard');
});

module.exports = router;