import http from "node:http"

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/html; chatset=utf-8")
    res.write("Hello World ! 👋");
    res.end();
});

server.listen(3000, "::", () => {
    console.log("Server Up")
    console.log("Server URL - http://[::]:3000")
});