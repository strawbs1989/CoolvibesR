import * as functions from 'firebase-functions';  // Use Firebase Functions v1
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

// Initialize Firebase Admin SDK
admin.initializeApp();

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'coolvibes1989@gmail.com',  // Replace with your actual Gmail
        pass: 'LauraMary1998'    // Replace with your actual password or app-specific password
    }
});

// Cloud Function to send an email when a new message is created in Firestore
exports.sendEmailNotification = functions.firestore.document('messages/{messageId}')
    .onCreate((snap: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) => {
        const newMessage = snap.data(); // Get the new message data

        if (!newMessage) {
            console.log('No message data found');
            return null;
        }

        const mailOptions = {
            from: 'your-email@gmail.com',   // Sender address
            to: 'recipient@example.com',    // Recipient address
            subject: `New message from ${newMessage.username}`,  // Subject line
            text: newMessage.message        // Email message content
        };

        // Send email using Nodemailer
        return transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
            if (error) {
                console.error('Error sending email:', error);
                return;
            }
            console.log('Email sent successfully:', info.response);
        });
    });