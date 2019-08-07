/**
 * Create a .env file that contains your email credentials:

 GMAIL_USER = **your_email_address**@gmail.com
 GMAIL_PASS = **secret_password_here**

 */



require('dotenv').config();
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
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    }); //NOTE:  Use .env variables here for your user & pass.  Keep your credentials out of your github repo.

    let htmlTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/email.html'), 'UTF-8');

    Object.keys(elementMap).forEach(key => {
        htmlTemplate = htmlTemplate.replace(new RegExp(`__${elementMap[key]}__`, 'g'), req.body[key]);
    });

    htmlTemplate = htmlTemplate.replace(new RegExp(`__SITE__`, 'g'), "mc.dev"); // <-- enter your website here

    const sendTo = [process.env.GMAIL_USER]; // array of recipients.  Add your email address here.

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
            if (req.body.copy) {
                mailOptions.to = `${req.body.fromName} <${req.body.fromEmail}>`;
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log('error', error);
                        res.status(503).json({
                            message: 'send failed'
                        });
                    } else {
                        res.status(200).json({
                            message: "mail sent"
                        })
                    }
                })
            } else {
            res.status(200).json({
                message: "mail sent"
            })
        }
        }
    })
}

module.exports = sendMailFromGmail;
