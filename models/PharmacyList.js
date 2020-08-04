const mongoose = require('mongoose');

const pharmacyListSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: "pharmacyName"
    },
    letter: {
        type: String,
        required: true,
    },
    names: {
        type: Array,
        required: true
    },
});

const pharmacyList = mongoose.model('pharmacyList', pharmacyListSchema);

module.exports = pharmacyList;