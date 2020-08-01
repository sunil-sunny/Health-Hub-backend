/* @author Avinash Gazula <agazula@dal.ca> */

const Appointment = require('../models/Appointment');
const Notification = require('../models/NotificationModel');

exports.getReservedTimes = (req, res) => {
    const { doctorId, date } = req.query;
    Appointment.find({ doctorId, date })
        .then((models) => {
            reservedSlots = [];
            for (let i = 0; i < models.length; i++) {
                reservedSlots.push(models[i].time);
            }
            return res.status(200).json({
                success: true,
                reservedSlots,
            });
        })
        .catch((err) => {
            return res.status(200).json({
                success: false,
                error: err,
            });
        });
};

exports.requestAppointment = (req, res) => {
    const { doctorId, patientId, patientName, date, time } = req.body;

    const newAppointment = new Appointment({ doctorId, patientId, date, time });
    newAppointment
        .save()
        .then(() => {
            const newNotification = new Notification({
                userId: doctorId,
                message: `Appointment with ${patientName} on ${date} at ${time}`,
            });
            newNotification
                .save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        id: newAppointment._id,
                    });
                })
                .catch((err) => {
                    return res.status(200).json({
                        success: false,
                        duplicate: false,
                        error: err,
                    });
                });
        })
        .catch((err) => {
            if (err.code === 11000 || err.code === 11001) {
                return res.status(200).json({
                    success: false,
                    duplicate: true,
                    error: err,
                });
            }
            return res.status(200).json({
                success: false,
                duplicate: false,
                error: err,
            });
        });
};
