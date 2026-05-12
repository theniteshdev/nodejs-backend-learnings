const http = require('http'); // Use 'https' for secure connections

const options = {
    hostname: 'localhost:3000',
    method: 'GET',
    testingHeader: String('a').repeat(300000)
};

const req = http.get(options, (res) => {
    res.on('data', (chunk) => {
        rawData += chunk;
    });
});

// Handle request-level errors
req.on('error', (err) => {
    console.error(`Request error: ${err.message}`);
});   