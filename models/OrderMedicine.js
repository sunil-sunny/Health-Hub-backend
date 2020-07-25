// author: Harshit Trivedi

const mongoose = require('mongoose');

// describing the Schema
const orderMedicineSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: "orderMedicine"
    },
    pharmacyName: {
        type: String,
        required: true,
    },
    apartmentNo: {
        type: Number,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    prescriptionFile: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: false
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

// compiling the model from our schema
const orderMedicine = mongoose.model('orderMedicine', orderMedicineSchema);

// exporting the model to router file for actions, operations and functionality
module.exports = orderMedicine;