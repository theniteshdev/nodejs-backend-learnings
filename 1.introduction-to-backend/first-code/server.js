const http = require("http")

const server = http.createServer((req, res) => {
    res.end("server up!");
});

server.listen("8000");