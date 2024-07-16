const https = require('https');

// Ping an external service to keep your project awake
setInterval(() => {
    https.get('https://rich-sticky-seed.glitch.me', (res) => {
        console.log(`Pinged example.com with status code: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });
}, 5 * 60 * 1000); // Ping every 5 minutes

