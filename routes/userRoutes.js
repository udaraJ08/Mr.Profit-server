const express = require('express')
const route = express.Router()

///use modals
const userModal = require('../DB/User')

//use bcrypt
const bcrypt = require('bcrypt')

///////////Handle Error/////////////
const handleErrorMsg = (usernameMsg, passwordMsg, status) => {

    const errorMsg = {
        username: usernameMsg,
        password: passwordMsg,
        satus: status
    }

    return errorMsg
}


//////////////////////////////////////
////////POST Requests////////////////
////////////////////////////////////
route.post('/user/login', async (req, res) => {

    const { username, password } = req.body

    const data = await userModal.findOne({ "username": username })

    if (data) {
        const auth = await bcrypt.compare(password, data.password)

        if (auth)
            res.send(handleErrorMsg("", "", true))
        else
            res.send(handleErrorMsg("", "*.Invalid password, check the password again", false))

    } else {
        res.send(handleErrorMsg("*.Invalid user, check the username again", "", false))
    }
})

route.post('/user/signup', async (req, res) => {

    const { username, password } = req.body

    const salt = await bcrypt.genSalt()
    const hashedPW = await bcrypt.hash(password, salt)

    const data = {
        username: username,
        password: hashedPW
    }
    await userModal.create(data).
        then(data => {
            res.send(data)
        }).catch(err => {
            if (err)
                res.send(err.message)
        })
})

route.post('/user/forgotPW', (req, res) => {

    res.send()
})

module.exports = route