/* @author Avinash Gazula <agazula@dal.ca> */
/* @author Sai Sunil Menta <ss734478@dal.ca>*/

const express = require('express');
const router = express.Router();
const {
    requestAppointment,
    getReservedTimes,
    acceptAppointment,
    getAllApointments,
    deleteAppointment

} = require('../controllers/appointmentController');

router.get('/reserved-slots', getReservedTimes);
router.post('/request', requestAppointment);
router.post('/acceptAppointment/:id', acceptAppointment);
router.get('/getAppointments/:id', getAllApointments);
router.post('/deleteAppointment/:id', deleteAppointment);

module.exports = router;