/* @author Avinash Gazula <agazula@dal.ca> */
/* @author Sai Sunil Menta <ss734478@dal.ca>*/

const Appointment = require('../models/Appointment');
const Notification = require('../models/NotificationModel');
const User = require('../models/User');

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


exports.acceptAppointment = async(req, res) => {

    try {
        const appointmentId = req.params.id;
        await Appointment.findByIdAndUpdate(appointmentId, { confirmed: true });
        const appointmentDetails = await Appointment.findById(appointmentId);
        const userDetails = await User.findById(appointmentDetails.doctorId);
        const notoficationMessage = `your Appointment with Dr.${userDetails.name} has been confirmed`;
        const newNotification = new Notification({
            userId: appointmentDetails.patientId,
            message: notoficationMessage
        });
        await newNotification.save();
        res.status(200).json({
            "result": "true"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            duplicate: false,
            error: err
        });
    }

};


exports.getAllApointments = async(req, res) => {

    try {
        const doctorId = req.params.id;
        var currentdate = new Date();
        const appointments = await Appointment.find({
            confirmed: false,
            date: {
                $gte: currentdate
            },
            doctorId: {
                doctorId
            }
        });
        res.status(200).send(appointments);
    } catch (err) {
        res.status(500).json({
            success: false,
            duplicate: false,
            error: err
        });
    }
};

exports.deleteAppointment = async(req, res) => {

    try {
        const appointmentId = req.params.id;
        const appointmentDetails = await Appointment.findById(appointmentId);
        await Appointment.deleteOne({ _id: appointmentId });
        const userDetails = await User.findById(appointmentDetails.doctorId);
        const notoficationMessage = `your Appointment with Dr.${userDetails.name} has been cancelled, Kindly schedule again`;
        const newNotification = new Notification({
            userId: appointmentDetails.patientId,
            message: notoficationMessage
        });
        await newNotification.save();
        res.status(200).json({
            "result": "true"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            duplicate: false,
            error: err
        });
    }

};