/* @author Avinash Gazula <agazula@dal.ca> */

const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true,
    },
    patientId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        required: true,
        default: false,
    },
});
AppointmentSchema.index({ doctorId: 1, date: 1, time: 1 }, { unique: true });
const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
