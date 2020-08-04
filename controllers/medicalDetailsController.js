/* @author Rudra Makwana <rd851601@dal.ca> */

const MedicalDetails = require('../models/MedicalDetails');
const UserDetails = require('../models/User')
const e = require('express');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = "PASSWORDPROTECTION";
const encryption = require('../config/encryption');
const decryption = require('../config/decryption');

module.exports = () => {
    exports.getMedicalDetails = (req, res) => {
        const {uID} = req.body;
        var decipher = crypto.createDecipher(algorithm, key);

        if (uID == "" || uID == null || uID == undefined) {
            res.sendStatus(403);
        }
        else {
            MedicalDetails.findOne({userID: uID},function(err, result) {
                if (err) throw err;
                if(result==null || result == undefined){
                    res.json(result);
                }
                else{
                    result.bloodPressure = decryption(result.bloodPressure);
                    result.Height = decryption(result.Height);
                    result.Weight = decryption(result.Weight);
                    result.heartRate = decryption(result.heartRate);
                    result.hemoglobin = decryption(result.hemoglobin);
                    result.hemoglobinA1c = decryption(result.hemoglobinA1c);
                    result.hematocrit = decryption(result.hematocrit);
                    result.rbc = decryption(result.rbc);
                    result.wbc = decryption(result.wbc);
                    result.plt = decryption(result.plt);
                    res.json(result);
                }
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

        height = encryption(Height.toString());
        weight = encryption(Weight.toString());
        BloodPressure = encryption(bloodPressure.toString());
        HR = encryption(heartRate.toString());
        HEMO = encryption(hemoglobin.toString());
        HEMOa1C = encryption(hemoglobinA1c.toString());
        HEMA = encryption(hematocrit.toString());
        RBC = encryption(rbc.toString());
        WBC = encryption(wbc.toString());
        PLT = encryption(plt.toString());

        console.log("Cipher Value:" +BloodPressure);
        
        MedicalDetails.findOneAndUpdate({userID: userId}, 
            {userID: userId, Height: height, Weight: weight, bloodPressure: BloodPressure, heartRate: HR, hemoglobin: HEMO, hemoglobinA1c: HEMOa1C, hematocrit: HEMA, rbc: RBC, wbc: WBC, plt: PLT}, 
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