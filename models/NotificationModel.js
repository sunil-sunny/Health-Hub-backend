/* @author Sai Sunil Menta <ss734478@dal.ca> */

const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isSeen: {
        type: Boolean,
        default: false
    }
})

const Notification = mongoose.model('notification', NotificationSchema);

module.exports = Notification;