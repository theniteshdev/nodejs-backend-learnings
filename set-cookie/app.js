import http from 'node:http'
const PORT = 80;
const HOSTNANE = '0.0.0.0';
const server = http.createServer((req, res) => {
    res.end("Ok");
    console.log(req.headers.cookie);
    if (req.url == "/login") {
        res.setHeader("Set-Cookie", "sessionId=abc123; Max-Age:60; HttpOnly");
    }
});

server.listen(PORT, HOSTNANE, (err) => {
    if (err) process.exit(1);
    console.log("Server Up")
    console.log(`URL: http://127.1.1.1:${PORT}`)
});