import http from 'node:http'

const server = http.createServer((req, res) => {
    console.log(req.headers.host)
    console.log(req.url)
    res.end("Hello, from nodejs server !!");
});

// server.on("connection", (socket) => {
// socket.write("HTTP/1.1 200 OK/n/nHello World from http module server")
// socket.end();
// });

// server.on("request", (req, res) => {
//     res.setHeader('Content-Length', 13);
//     res.setHeader('Access-Control-Allow-Origin', "*");
//     res.setHeader('testing-header1', "testing");
//     res.write("Hello World !");
// })

server.listen(3000, '0.0.0.0', (err) => {
    console.log(`Server running at url: 'http://127.1.1.1:3000'`)
})