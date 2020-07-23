const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: "doctor"
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    }
})

const Doctors = mongoose.model('Users', DoctorSchema);

module.exports = Doctors;