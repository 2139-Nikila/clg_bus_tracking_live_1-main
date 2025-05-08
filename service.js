const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendEta = (email, etaMessage) => {
    const mail = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: "Bus Arrival Time",
        text: etaMessage,
    };

    transporter.sendMail(mail);
};

module.exports = { sendEta };