const express = require("express");
const router = express.Router();
const Doctors = require('../models/Doctors');

module.exports = () => {
    const { getDoctors, getAllDoctors, getAllPhysicians, getAllSurgeons } = require('../controllers/searchDoctorController')();
    
    console.log("Route is hit");
    router.post("/search-doctors", getDoctors);

    router.post("/alldoctors",getAllDoctors);

    router.post("/all-physicians", getAllPhysicians);

    router.post("/all-surgeons", getAllSurgeons);

    return router;
}