const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: [true, "username is already in use"]
    },
    password: {
        type: String,
        required: true
    }
})

const UserModal = mongoose.model('User', userSchema)

module.exports = UserModal