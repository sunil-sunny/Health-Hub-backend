// author: Harshit Trivedi

const mongoose = require('mongoose');

// describing the Schema
const homeCareSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: "homeCare"
    },
    userName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    homeCareDate: {
        type: Date,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    comments: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// compiling the model from our schema
const homeCare = mongoose.model('homeCare', homeCareSchema);

// exporting the model to router file for actions, operations and functionality
module.exports = homeCare;