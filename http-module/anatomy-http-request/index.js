import http from 'node:http';

const server = http.createServer((req, res) => {
    req.on("data", (chnks) => {
        console.log(chnks);
    })

    res.end("Ok");
});

server.on("connection", (socket) => {
    console.log("logging socket")
    // console.log(socket)
});
console.log(http.STATUS_CODES);

server.on("connect", (res, soc) => {
    console.log("logging soc")
    console.log(soc);
});

server.listen(2000, '0.0.0.0', (backlog) => {
    console.log(backlog)
    console.log(`Server running !!`)
});