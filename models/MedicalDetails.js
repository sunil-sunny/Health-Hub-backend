/* @author Rudra Makwana <rd851601@dal.ca> */

const mongoose = require('mongoose');

const MedicalDetailScema = new mongoose.Schema({
    userID: {
        type: String,
        required: false
    },
    Height: {
        type: Number,
        required: false
    },
    Weight: {
        type: Number,
        required: false
    },
    bloodPressure: {
        type: Number,
        required: false
    },
    heartRate: {
        type: Number,
        required: false
    },
    hemoglobin: {
        type: Number,
        required: false
    },
    hemoglobinA1c: {
        type: Number,
        required: false
    },
    hematocrit: {
        type: Number,
        required: false
    },
    rbc: {
        type: Number,
        required: false
    },
    wbc: {
        type: Number,
        required: false
    },
    plt: {
        type: Number,
        required: false
    }
});

const MedicalDetails = mongoose.model('medicalhistory', MedicalDetailScema);

module.exports = MedicalDetails;