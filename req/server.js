const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 1988;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (your frontend)
app.use(express.static('public'));

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'coolvibesrequests2@gmail.com', // Replace with your email
        pass: 'fcpa njpf ocok yplk' // Replace with the app password generated
    },
});

// Endpoint to handle form submission
app.post('/index.html', (req, res) => {
    const { name, songartist, dedication } = req.body;

    const mailOptions = {
        from: 'coolvibesrequests2@gmail.com', // Replace with your email
        to: 'coolvibesrequests2@gmail.com', // Replace with the recipient's email
        subject: 'New Song Request',
        html: `
            <h1>New Song Request</h1>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Song and Artist:</strong> ${songartist}</p>
            <p><strong>Dedication:</strong> ${dedication}</p>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send({ error: 'Failed to send email' });
        }
        res.send({ message: 'Request received successfully!' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${1988}`);
});
