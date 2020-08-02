/* @author Rudra Makwana <rd851601@dal.ca> */

const MedicalDetails = require('../models/MedicalDetails');
const UserDetails = require('../models/User')
const e = require('express');

module.exports = () => {
    exports.getMedicalDetails = (req, res) => {
        const {uID} = req.body;
        
        if (uID == "" || uID == null || uID == undefined) {
            res.sendStatus(403);
        }
        else {
            MedicalDetails.findOne({userID: uID},function(err, result) {
                if (err) throw err;
                res.json(result);
            });
        }
    }

    exports.getUserInfo = (req, res) => {
        const {uID} = req.body;

        if (uID == "" || uID == null || uID == undefined) {
            res.sendStatus(403);
        }
        else {
            UserDetails.findById(uID,function(err, result) {
                if (err) throw err;
                res.json(result);
            });
        }
    }

    exports.updateMedicalHistory = (req, res) => {
        const {userId, Height, Weight, bloodPressure, heartRate, hemoglobin, hemoglobinA1c, hematocrit, rbc, wbc, plt} = req.body;
        
        MedicalDetails.findOneAndUpdate({userID: userId}, 
            {userID: userId, Height: Height, Weight: Weight, bloodPressure: bloodPressure, heartRate: heartRate, hemoglobin: hemoglobin, hemoglobinA1c: hemoglobinA1c, hematocrit: hematocrit, rbc: rbc, wbc: wbc, plt: plt}, 
            {new: true, upsert: true},  (err, result) => {
                if (err) {
                    res.status(400).json({
                        success: false,
                        message: err
                    });
                }
                res.status(200).json({
                    success: true,
                })
            }
        );
    }

    return exports;
}