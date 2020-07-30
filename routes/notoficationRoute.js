/* @author Sai Sunil Menta <ss734478@dal.ca> */

const express = require('express')
const router = express.Router()
const Notification = require('../models/NotificationModel')
const sendNotification = require('../routes/sendNotification')

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
        console.log(err)
        res.status(500).json({ "Error": "Unable to process" })
    }
})


module.exports = router