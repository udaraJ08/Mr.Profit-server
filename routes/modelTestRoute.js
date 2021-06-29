const express = require('express')
const router = express.Router();

router.get('/add', (req, res) => {
    res.send("This is the expense adding page !!!")
})

module.exports = router;