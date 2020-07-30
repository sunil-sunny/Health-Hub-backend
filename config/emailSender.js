/* @author Sai Sunil Menta <ss734478@dal.ca> */

const { SENDER_EMAIL } = require("../config/keys");
const { EMAIL_PASSWORD } = require("../config/keys");
var nodemailer = require('nodemailer');
const emailSender = (receiverEmail, subjectText, message) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SENDER_EMAIL,
            pass: EMAIL_PASSWORD
        }
    });

    var mailOptions = {
        from: SENDER_EMAIL,
        to: receiverEmail,
        subject: subjectText,
        text: message
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                reject(err);;
            } else {
                resolve("Message sent if the mail is valid")
            }
        });
    })
}

module.exports = emailSender