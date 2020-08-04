/* @author Sai Sunil Menta <ss734478@dal.ca> */

const mongoose = require('mongoose');

const suggestDoctorSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    symptoms: {
        type: [String],
        required: true,
        default: []
    }
})

const suggestDoctorModel = mongoose.model('symptom', suggestDoctorSchema, 'symptoms')

module.exports = suggestDoctorModel;