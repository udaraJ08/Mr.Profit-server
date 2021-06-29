const { mkdir } = require('fs');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const expencesSchema = new schema({
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
    expencesAmount: {
        type: Number,
        required: true
    },
    profit: {
        type: Number,
        require: true
    },
    negativeProfit: {
        type: Number,
        required: true
    },
}, { timestamps: true })

const expences = mongoose.model('Expence', expencesSchema)

module.exports = expences;