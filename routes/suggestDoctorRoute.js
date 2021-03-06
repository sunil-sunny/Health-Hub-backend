/* @author Sai Sunil Menta <ss734478@dal.ca> */

const express = require("express");
const router = express.Router();
const suggestDoctorModel = require('../models/suggestDoctor')
const User = require('../models/User')
const escapeStringRegexp = require('escape-string-regexp');
require('body-parser')
var HashSet = require("hashset");

router.post("/suggestDoctor", async(req, res) => {
    const symptoms = req.body.symptoms
    const location = req.body.location
    const $regex = escapeStringRegexp(location);
    var docterTpye = new HashSet();
    try {
        const types = await suggestDoctorModel.find({ symptoms: { $in: symptoms } }).exec();
        types.forEach((specialist) => {
            docterTpye.add(specialist.type)
        });
        const specializations = docterTpye.toArray()
        const doctors = await User.find({
            specialization: specializations,
            location: {
                $regex
            },
            fee: { $lt: req.body.price }
        })
        res.status(200).send(doctors)
    } catch (err) {
        res.status(500).json({ "Error": "Unable to process" })
    }
})

router.get("/getSymptomsList", async(req, res) => {
    try {
        var symptomList = new HashSet();
        const results = await suggestDoctorModel.find().select('symptoms')
        results.forEach((result) => {
            var eachSymptom = result.symptoms
            eachSymptom.forEach((i) => {
                symptomList.add(i)
            });
        });
        res.status(200).send(symptomList.toArray())
    } catch (err) {
        res.status(500).json({ "Error": "Unable to process" })
    }

})

module.exports = router