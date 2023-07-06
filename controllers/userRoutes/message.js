const express = require('express');
const router = express.Router();
const { Messages } = require('../../models');
const withAuth = require('../../utils/auth');
const nodemailer = require('nodemailer');

// Message route (GET)
router.get('/', withAuth, async (req, res) => {
    res.render('message');
});

// Send a Message route (POST)
router.post('/', withAuth, async (req, res) => {
    try {
        const { chat_id, box_check } = req.body;
        const originalMessageText = req.body.message_text
        let delay_send;
        if (!box_check) {
            delay_send = false;
        } else {
            delay_send = true;
        }
        const { userID, username } = req.session;
        console.log(`\n${userID}: ${username} sends the message: '${originalMessageText}' at chat with ID: ${chat_id} with delay send? ${delay_send}\n`);

        const newMessageData = await Messages.create({
            message_text: originalMessageText,
            chat_id: chat_id,
            user_id: userID,
            delay_send: delay_send
        })
        const newMessage = newMessageData.get({ plain: true });
        console.log("Your new msg king!: " + newMessage);

        // plug in nodemailer 
        const { email, subject, message_text } = req.body;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        // Define email options
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: subject,
            text: message_text
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.redirect('/'); // Redirect to an error page or handle the error accordingly
            } else {
                console.log('Email sent: ' + info.response);
                res.redirect('/'); // Redirect to a success page or handle the success accordingly
            }
        });


        // render sent message page here
    } catch (err) {
        console.log(err);
        res.json(err);
    }
});

module.exports = router;