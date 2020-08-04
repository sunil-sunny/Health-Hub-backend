/* @author Rudra Makwana <rd851601@dal.ca> */

const express = require("express");
const router = express.Router();

module.exports = () => {
    
    const { getMedicalDetails, getUserInfo, updateMedicalHistory } = require('../controllers/medicalDetailsController')();

    router.post("/details", getMedicalDetails);

    router.post("/userinfo", getUserInfo);

    router.post("/update", updateMedicalHistory);

    return router;
}