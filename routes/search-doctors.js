const express = require("express");
const router = express.Router();
const Doctors = require('../models/Doctors');

module.exports = () => {
    const { getDoctors } = require('../controllers/searchDoctorController')();
    
    router.post("/search-doctors", getDoctors);

    return router;
}