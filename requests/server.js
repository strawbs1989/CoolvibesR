const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/submit_request', (req, res) => {
    const { name, songartist, dedication } = req.body;
    console.log(`Name: ${name}, Song Artist: ${songartist}, Dedication: ${dedication}`);
    res.send('Request received');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
