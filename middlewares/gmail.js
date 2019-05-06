const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const elementMap = {
    "subject": "SUBJECT",
    "fromName": "FROM-NAME",
    "fromEmail": "FROM-EMAIL",
    "body": "BODY"
}

const sendMailFromGmail = (req, res, next) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '<your gmail account>@gmail.com',
            pass: '<your password>'
        }
    }); //NOTE:  Use .env variables here for your user & pass.  Keep your credentials out of your github repo.

    let htmlTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/email.html'), 'UTF-8');
    for (const key in elementMap) {
        htmlTemplate = htmlTemplate.replace(new RegExp(`__${elementMap[key]}__`, 'g'), req.body[key]);
    }
    htmlTemplate = htmlTemplate.replace(new RegExp(`__SITE__`, 'g'), "mc.dev"); // <-- enter your website here

    const sendTo = ['<your email here>']; // array of recipients.  Add your email address here.
    if (req.body.copy) {
        sendTo.push(req.body.fromEmail)
    }

    const mailOptions = {
        from: `${req.body.fromName} <${req.body.fromEmail}>`, // sender address
        to: sendTo, // list of receivers
        subject: req.body.subject, // Subject line
        text: req.body.body, // plain text body
        html: htmlTemplate //html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('error', error);
            res.status(503).json({
                message: 'send failed'
            });
        } else {
            console.log('Email sent: ', info.response);
            res.status(200).json({
                message: "mail sent"
            })
        }
    })
}

module.exports = sendMailFromGmail;
