import http from "node:http";

const sever = http.createServer((req, res) => {
    console.log(req.url);
    res.end("OK");
});

sever.listen(3003, "localhost", (err) => {
    console.log(err || "Sever Up !");
});