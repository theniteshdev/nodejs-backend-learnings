const http = require("http");

const server = http.createServer((req, res) => {
    console.log("connection");
    res.end("OK");
})

server.listen(5000, "localhost", (err) => {
    console.log("serving running")
})