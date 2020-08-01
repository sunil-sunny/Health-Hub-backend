/* @author Avinash Gazula <agazula@dal.ca> */

const express = require('express');
const router = express.Router();
const {
    requestAppointment,
    getReservedTimes,
} = require('../controllers/appointmentController');

router.get('/reserved-slots', getReservedTimes);
router.post('/request', requestAppointment);

module.exports = router;
