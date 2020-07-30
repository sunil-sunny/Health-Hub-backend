/* @author Sai Sunil Menta <ss734478@dal.ca> */

const express = require('express')
const router = express.Router()
const Notification = require('../models/NotificationModel')
const sendNotification = require('./sendNotification')

router.post('/readNotification/:id', async(req, res) => {

    try {
        const notificationId = req.params.id
        console.log(notificationId)
        await Notification.findByIdAndUpdate(notificationId, { isSeen: true })
        res.status(200).json({
            "result": "true"
        })
    } catch (err) {
        res.status(500).json({ "Error": "Unable to process", "result": "false" })
    }

})

router.get('/getNotifications/:id', async(req, res) => {
    try {
        const userId = req.params.id
        const notofications = await Notification.find({ userId: userId, isSeen: false })
        res.status(200).send(notofications)

    } catch (err) {
        console.log(err)
        res.status(500).json({ "Error": "Unable to process" })
    }
})


module.exports = router