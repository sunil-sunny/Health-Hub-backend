const pharmacyNames = require('../models/PharmacyList');
const { response } = require('express');

// GET pharmacy names
exports.getPharmacyList = async (req, res, next) => {
    try {
        const pharmacyList = await pharmacyNames.find();
        // everything went fine status = OK
        return res.status(200).json({
            success: true,
            count: pharmacyList.length,
            data: pharmacyList
        });
    } catch (err) {
        // send server error
        return res.send(500).json({
            success: false,
            error: 'Server Error'
        });
    }
}