const { SENDER_EMAIL } = require("../config/keys");
const { EMAIL_PASSWORD }= require("../config/keys");
var nodemailer = require('nodemailer');
const emailSender= async (receiverEmail, subjectText, message,callback)=> {
    
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

    transporter.sendMail(mailOptions, (err) => {

        if (err) {
            callback('Error in sending email',false)
        } else {
            callback('email sent',true)
        }
    });
}

module.exports=emailSender

