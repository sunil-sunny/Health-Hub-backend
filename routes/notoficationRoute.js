/* @author Sai Sunil Menta <ss734478@dal.ca> */

const express = require('express')
const router = express.Router()
const Notification = require('../models/NotificationModel')


router.get('/readNotification/:id', async(req, res) => {

    try {
        const notificationId = req.params.id
        await Notification.findByIdAndUpdate(notificationId, { isSeen: true })
        res.status(200).json({ read: true })
    } catch (err) {
        res.status(500).json({ "Error": "Unable to process" })
    }

})

router.get('/getNotifications', async(req, res) => {

    try {

        const notofications = await Notification.find({ isSeen: false })
        res.status(200).send(notofications)

    } catch (err) {
        res.status(500).json({ "Error": "Unable to process" })

    }
})

const sendNotification = async(userId, message) => {

    const notification = new Notification({ userId: userId, message: message })

    notification.save((err) => {

        if (err) {
            console.log('Error')
        } else {
            console.log('saved')
        }
    })
}

module.exports = router, sendNotification