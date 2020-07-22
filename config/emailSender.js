const { SENDER_EMAIL } = require("../config/keys");
const { EMAIL_PASSWORD }= require("../config/keys");

module.exports = (receiverEmail, subjectText, message)=> {
    
    var nodemailer = require('nodemailer');
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
            console.log('error');
        } else {
            console.log('email sent');
        }
    });
}


