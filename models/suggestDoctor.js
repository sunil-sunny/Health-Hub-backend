const mongoose = require('mongoose');

const suggestDoctorSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    symptoms: {
        type: [String],
        required: true,
        default : []
    }
})

const suggestDoctorModel = mongoose.model('symptom', suggestDoctorSchema,'symptoms')

module.exports = suggestDoctorModel;