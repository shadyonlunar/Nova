const express = require('express');
const request = require('request');
const app = express();
const PORT = 3001;

app.get('/?url=', (req, res) => {
    const url = req.query.url;

    // Make sure the URL is properly formatted
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return res.status(400).send('Invalid URL');
    }

    request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.send(body);
        } else {
            res.status(response.statusCode).send('Error fetching the URL.');
        }
    });
});

app.listen(PORT, '0.0.0.0', () => { // Listen on all interfaces
    console.log(`Proxy server is running on http://0.0.0.0:${PORT}`);
});
