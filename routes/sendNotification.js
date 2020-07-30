/* @author Sai Sunil Menta <ss734478@dal.ca> */
const Notification = require('../models/NotificationModel')

module.exports = async(userId, message, callback) => {
    try {
        const notification = new Notification({ userId: userId, message: message })

        await notification.save((err) => {
            if (err) {
                console.log('err ')
                callback(err, false)
            } else {
                console.log("noti sent")
                callback('message sent', true)
            }
        })

    } catch (err) {
        callback(err, false)
    }
}