require('dotenv').config();
const nodemailer = require("nodemailer");

async function emailservice(mailOptions) {
    console.log(mailOptions)
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

exports.email=emailservice;