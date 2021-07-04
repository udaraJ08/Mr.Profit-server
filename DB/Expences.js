const { mkdir } = require('fs');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const expencesSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    time: {
        year: {
            type: Number,
            required: true
        },
        month: {
            type: String,
            required: true
        }
    },
    income: {
        type: Number,
        required: true
    },
    expences: {
        type: Object,
        required: true,
        default: {}
    },
    expencesAmount: {
        type: Number,
        required: true
    },
    profit: {
        type: Number,
        require: true
    }
}, { timestamps: true, minimize: false })

const expences = mongoose.model('Expence', expencesSchema)

module.exports = expences;