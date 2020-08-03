/* @author Rudra Makwana <rd851601@dal.ca> */
/* @author Avinash Gazula <agazula@dal.ca> */

const Doctors = require('../models/Doctors');
const suggestDoctor = require('../models/suggestDoctor');
const e = require('express');
const { type } = require('jquery');
const { request } = require('express');

module.exports = () => {
    exports.getDoctors = (req, res) => {
        const { keyword, searchfield } = req.body;

        if (keyword.length == 0 || searchfield == '') {
            res.sendStatus(403);
        } else {
            if (searchfield == 'Name') {
                resulr = Doctors.find(
                    { name: new RegExp(keyword, 'i'), type: 'doctor' },
                    function (err, result) {
                        if (err) throw err;
                        res.json(result);
                    }
                );
            } else {
                resulr = Doctors.find(
                    {
                        specialization: new RegExp(keyword, 'i'),
                        type: 'doctor',
                    },
                    function (err, result) {
                        if (err) throw err;
                        res.json(result);
                    }
                );
            }
        }
    };

    exports.getAllDoctors = (req, res) => {
        results = Doctors.find({ type: 'doctor' }, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
    };

    exports.getAllPhysicians = (req, res) => {
        results = Doctors.find(
            {
                type: 'doctor',
                specialization: new RegExp('general physician', 'i'),
            },
            function (err, result) {
                if (err) throw err;
                res.json(result);
            }
        );
    };

    exports.getAllSurgeons = (req, res) => {
        results = Doctors.find(
            { type: 'doctor', specialization: new RegExp('surgeon', 'i') },
            function (err, result) {
                if (err) throw err;
                res.json(result);
            }
        );
    };

    exports.getDoctorTypes = (req, res) => {
        let types = [];
        suggestDoctor
            .find()
            .then((docs) => {
                for (let i = 0; i < docs.length; i++) {
                    types.push(docs[i].type);
                }
                res.status(200).json({
                    success: true,
                    types,
                });
            })
            .catch((err) => {
                res.status(200).json({
                    success: false,
                    error: error,
                });
            });
    };

    return exports;
};
