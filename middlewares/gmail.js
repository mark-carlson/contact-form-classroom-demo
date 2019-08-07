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
    
}

module.exports = sendMailFromGmail;
