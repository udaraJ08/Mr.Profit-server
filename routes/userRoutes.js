const express = require('express')
const route = express.Router()

const userModal = require('../DB/User')

////////////////////////////////////
////////POST Requests////////////////
////////////////////////////////////
route.post('/user/validate', (req, res) => {

    res.send("HEllo this is the user !!!")
})

module.exports = userModal