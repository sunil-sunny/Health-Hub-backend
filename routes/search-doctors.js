/* @author Rudra Makwana <rd851601@dal.ca> */

const express = require('express');
const router = express.Router();
const Doctors = require('../models/Doctors');

module.exports = () => {
    const {
        getDoctors,
        getAllDoctors,
        getAllPhysicians,
        getAllSurgeons,
        getDoctorTypes,
    } = require('../controllers/searchDoctorController')();

    console.log('Route is hit');
    router.post('/search-doctors', getDoctors);

    router.post('/alldoctors', getAllDoctors);

    router.post('/all-physicians', getAllPhysicians);

    router.post('/all-surgeons', getAllSurgeons);

    router.get('/types', getDoctorTypes);

    return router;
};
