const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: "categoris app",
        greeting: "Welcome to categories"
    })
});

module.exports = router;