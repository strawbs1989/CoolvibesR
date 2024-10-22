const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Set up Nodemailer with your email credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'coolvibes1989@gmail.com',  // Replace with your Gmail
        pass: 'Dolphinsjay1989'    // Replace with your Gmail password (or App Password if 2FA is enabled)
    }
});

// Cloud Function to send email on new message
exports.sendEmailNotification = functions.firestore.document('messages/{messageId}')
    .onCreate((snap, context) => {
        const newMessage = snap.data(); // Get the new message data

        // Configure email options
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'recipient@example.com', // Replace with recipient email
            subject: `New message from ${newMessage.username}`,
            text: newMessage.message
        };

        // Send email
        return transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return;
            }
            console.log('Email sent:', info.response);
        });
    });
