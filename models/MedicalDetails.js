/* @author Rudra Makwana <rd851601@dal.ca> */

const mongoose = require('mongoose');

const MedicalDetailScema = new mongoose.Schema({
    userID: {
        type: String,
        required: false
    },
    Height: {
        type: String,
        required: false
    },
    Weight: {
        type: String,
        required: false
    },
    bloodPressure: {
        type: String,
        required: false
    },
    heartRate: {
        type: String,
        required: false
    },
    hemoglobin: {
        type: String,
        required: false
    },
    hemoglobinA1c: {
        type: String,
        required: false
    },
    hematocrit: {
        type: String,
        required: false
    },
    rbc: {
        type: String,
        required: false
    },
    wbc: {
        type: String,
        required: false
    },
    plt: {
        type: String,
        required: false
    }
});

const MedicalDetails = mongoose.model('medicalhistory', MedicalDetailScema);

module.exports = MedicalDetails;