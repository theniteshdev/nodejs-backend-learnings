import http from 'node:http'
const PORT = 4001;
const HOSTNANE = '0.0.0.0';
const server = http.createServer((req, res) => {
    // res.setHeader("Set-Cookie", "username=theniteshdev")
    // res.setHeader("Set-Cookie", "id=hu5uf")
    // res.setHeader("Set-Cookie", "address=lakshmana-nagar;httpOnly")
    // res.setHeader("Set-Cookie", `currentTime=${new Date().toLocaleString()}`)
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.setHeader("Access-Control-Allow-Credentials", "true")
    console.log(req.headers.cookie);
    if (req.url == "/login") {
        res.setHeader("Set-Cookie", "sessionId=abc123; Max-Age:60; HttpOnly;Secure;SameSite=None;");
    }
    res.end("Ok");
});

server.listen(PORT, HOSTNANE, (err) => {
    if (err) process.exit(1);
    console.log("Server Up")
    console.log(`URL: http://127.1.1.1:${PORT}`)
});
