const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: "consumer"
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    specialization: {
        type: String,
        required: false
    },
    fee: {
        type: Number,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const User = mongoose.model('User', UserSchema);

module.exports = User;