import http from "node:http";

const server = http.createServer((req, res) => {
    res.end("💎 Hello World ! This reponse from http module server.");
});

server.listen(3002, "localhost", () => {
    console.log(`Server is running at port ${3002}`)
})